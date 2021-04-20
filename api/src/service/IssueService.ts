import { Priority } from './../entity/enum/Priority';
import { getCustomRepository } from 'typeorm';
import EntityException from '../common/exception/EntityException';
import Issue from '../entity/Issue';
import IssueRepository from '../repository/IssueRepository';
import ProjectRepository from '../repository/ProjectRepository';
import { State } from './../entity/enum/State';
import Project from '../entity/Project';

export default class IssueService {
	private issueRepository: IssueRepository;
	private projectRepository: ProjectRepository;

	constructor() {
		this.issueRepository = getCustomRepository(IssueRepository);
		this.projectRepository = getCustomRepository(ProjectRepository);
	}

	public async get(projectId: string) {
		if (!projectId) {
			throw new EntityException('Missing parameter');
		}

		const project = await this.projectRepository.findOne(projectId, {
			relations: ['issues'],
		});

		if (!project) {
			throw new EntityException('Project not found');
		}

		return project.issues;
	}

	public async create(issue: Issue, projectId: string) {
		if (!issue || !issue.title || !issue.description) {
			throw new EntityException('Missing parameter');
		}

		issue.lastUpdate = new Date();
		issue.project = new Project({ id: projectId });
		issue.state = issue.state || State.Open;
		issue.priority = issue.priority || Priority.Trivial;

		return this.issueRepository.save(issue);
	}

	public async update(id: number, issue: Issue) {
		if (!(await this.issueRepository.isExistsById(id))) {
			throw new EntityException('Issue not found');
		}

		return this.issueRepository.update(id, issue);
	}

	public async delete(id: number) {
		if (!(await this.issueRepository.isExistsById(id))) {
			throw new EntityException('Issue not found');
		}

		return this.issueRepository.delete(id);
	}
}
