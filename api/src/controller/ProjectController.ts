import { authorize } from './../middleware/authorize';
import { validUUID } from '../middleware/validUUID';
import ProjectService from '../service/ProjectService';
import { authenticate } from '../middleware/authenticate';
import express, { Request, Response, Router } from 'express';
import SendError from '../common/utils/SendError';
import Project from '../entity/Project';
import User from '../entity/User';
import { Role } from '../entity/enum/Role';
import ProjectDto from '../dtos/ProjectDto';
import { mapper } from '../service/Mapper';

export default class ProjectController {
	public router: Router;
	private projectService: ProjectService;

	constructor() {
		this.projectService = new ProjectService();
		this.router = express.Router();
		this.routes();
	}

	/**
	 * Get all project from a user
	 * @param req
	 * @param res
	 */
	public get = async (req: Request, res: Response) => {
		try {
			const projects = await this.projectService.get(req.userId);

			res.status(200).send(
				mapper.mapArray(projects, ProjectDto, Project)
			);
		} catch (error) {
			SendError(error, res);
		}
	};

	public post = async (req: Request, res: Response) => {
		try {
			const project = req.body as Project;
			const newProject = await this.projectService.create(
				project,
				req.userId
			);

			res.status(201).send(mapper.map(newProject, ProjectDto, Project));
		} catch (error) {
			SendError(error, res);
		}
	};

	public addUserToProject = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const user = req.body as User;

			await this.projectService.addUser(id, user.email);
			res.status(200).send();
		} catch (error) {
			SendError(error, res);
		}
	};

	public put = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const project = req.body as Project;

			await this.projectService.update(id, project);
			res.status(200).send();
		} catch (error) {
			SendError(error, res);
		}
	};

	public delete = async (req: Request, res: Response) => {
		try {
			await this.projectService.delete(req.params.id);
			res.status(200).send();
		} catch (error) {
			SendError(error, res);
		}
	};

	public routes() {
		this.router.use(authenticate);
		this.router.use('/:id', validUUID);
		this.router.use('/:id', authorize([Role.Owner]));

		this.router.get('/', this.get);
		this.router.post('/', this.post);
		this.router.post('/:id/user', this.addUserToProject);
		this.router.put('/:id', this.put);
		this.router.delete('/:id', this.delete);
	}
}
