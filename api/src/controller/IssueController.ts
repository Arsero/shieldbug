import { validUUID } from '../middleware/validUUID';
import { authenticate } from '../middleware/authenticate';
import express, { Request, Response, Router } from 'express';
import SendError from '../common/utils/SendError';
import IssueService from '../service/IssueService';
import Issue from '../entity/Issue';
import IssueDto from '../dtos/IssueDto';
import { mapper } from '../service/Mapper';
import { authorize } from '../middleware/authorize';
import { Role } from '../entity/enum/Role';

export default class IssueController {
	public router: Router;
	private issueService: IssueService;

	constructor() {
		this.issueService = new IssueService();
		this.router = express.Router();
		this.routes();
	}

	/**
	 * Get all issues from a project
	 * @param req
	 * @param res
	 */
	public get = async (req: Request, res: Response) => {
		try {
			const projectId = req.params.id;
			const issues = await this.issueService.get(projectId);

			res.status(200).send(mapper.mapArray(issues, IssueDto, Issue));
		} catch (error) {
			SendError(error, res);
		}
	};

	public post = async (req: Request, res: Response) => {
		try {
			const projectId = req.params.id;
			const issue = req.body as Issue;
			const newIssue = await this.issueService.create(issue, projectId);

			res.status(201).send(newIssue, IssueDto, Issue));
		} catch (error) {
			SendError(error, res);
		}
	};

	public put = async (req: Request, res: Response) => {
		try {
			const id = req.params.issueId;
			const issue = req.body as Issue;

			await this.issueService.update(Number(id), issue);
			res.status(200).send();
		} catch (error) {
			SendError(error, res);
		}
	};

	public delete = async (req: Request, res: Response) => {
		try {
			const id = req.params.issueId;

			await this.issueService.delete(Number(id));
			res.status(200).send();
		} catch (error) {
			SendError(error, res);
		}
	};

	public routes() {
		this.router.use(authenticate);
		this.router.use('/:id', validUUID);
		this.router.use('/:id', authorize([Role.User, Role.Owner]));

		this.router.get('/:id/issues', this.get);
		this.router.post('/:id/issues', this.post);
		this.router.put('/:id/issues/:issueId', this.put);
		this.router.delete('/:id/issues/:issueId', this.delete);
	}
}
