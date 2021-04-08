import { getRepository } from 'typeorm';
import { Issue } from '../entities/Issue';

export class IssueService {
	private issueRepository = getRepository(Issue);

	async findByProject(projectId: string) {
		return this.issueRepository.find({ project: { id: projectId } });
	}

	async create(issue: Issue) {
		return this.issueRepository.create(issue);
	}

	async update(issue: Issue) {
		return this.issueRepository.update({ id: issue.id }, issue);
	}

	async remove(issueId: number) {
		return this.issueRepository.delete(issueId);
	}
}
