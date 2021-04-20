import { EntityRepository, Repository } from 'typeorm';
import EntityException from '../common/exception/EntityException';
import Issue from '../entity/Issue';
import Project from '../entity/Project';
import User from '../entity/User';

@EntityRepository(Project)
export default class ProjectRepository extends Repository<Project> {
	public async isExistsById(id: string): Promise<boolean> {
		const project = await this.findOne(id);
		return Boolean(project);
	}

	public async getIssues(id: string): Promise<Issue[]> {
		const project = await this.findOne(id, {
			relations: ['issues'],
		});

		if (!project) {
			throw new EntityException('Project not found');
		}

		return project.issues;
	}
}
