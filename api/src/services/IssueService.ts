import { getRepository, Repository } from 'typeorm';
import EntityException from '../common/exceptions/EntityException';
import Issue from '../entities/Issue';
import Project from '../entities/Project';

export default class IssueService {
	private issueRepository: Repository<Issue>;
	private projectRepository: Repository<Project>;

	constructor() {
		this.issueRepository = getRepository(Issue);
		this.projectRepository = getRepository(Project);
	}

	public async get(projectId: string, userId: number) {
		if (!projectId || !userId) {
			throw new EntityException('Missing parameter');
		}

		const project = await this.projectRepository.findOne(projectId, {
			relations: ['owner', 'users', 'issues'],
		});

		if (!project) {
			throw new EntityException('Project not found');
		}

		if (
			project.owner.id != userId &&
			!project.users.find((user) => user.id == userId)
		) {
			throw new EntityException('User not in this project');
		}

		return project.issues;
	}

	public async create(issue: Issue, projectId: string) {
		if (!issue || !issue.title || !projectId) {
			throw new EntityException('Missing parameter');
		}

		const project = await this.projectRepository.findOne({ id: projectId });
		if (!project) {
			throw new EntityException('Project not found');
		}

		issue.lastUpdate = new Date();
		issue.project = project;

		return this.issueRepository.save(issue);
	}

	public async update(id: number, issue: Issue, userId: number) {
		const projectDb = await this.projectRepository.findOne(id, {
			relations: ['owner', 'users'],
		});

		if (!projectDb || projectDb.owner.id != userId) {
			throw new EntityException('Project does not exist');
		}

		return this.issueRepository.update({ id: issue.id }, issue);
	}

	public async remove(issueId: number) {
		return this.issueRepository.delete(issueId);
	}
}
