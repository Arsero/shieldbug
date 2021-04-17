import { EntityRepository, Repository } from 'typeorm';
import EntityException from '../common/exception/EntityException';
import Issue from '../entity/Issue';
import Project from '../entity/Project';
import User from '../entity/User';

@EntityRepository(Issue)
export default class IssueRepository extends Repository<Issue> {
	public async isExistsById(id: number): Promise<boolean> {
		const issue = await this.findOne(id);
		return Boolean(issue);
	}

	public async isInProject(id: number, projectId: string): Promise<boolean> {
		const issue = await this.findOne(id, {
			relations: ['project'],
		});

		return issue.project.id == projectId;
	}
}
