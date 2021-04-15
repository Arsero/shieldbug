import { getRepository, Repository } from 'typeorm';
import EntityException from '../common/exceptions/EntityException';
import Project from '../entities/Project';

export default class ProjectService {
	private projectRepository: Repository<Project>;

	constructor() {
		this.projectRepository = getRepository(Project);
	}

	public async get(userId: number) {
		return this.projectRepository.find({ owner: { id: userId } });
	}

	public create(project: Project) {
		if (!project || !project.title) {
			throw new EntityException('Missing parameter');
		}

		project.created = new Date();
		return this.projectRepository.save(project);
	}

	public update(project: Project) {
		return this.projectRepository.update({ id: project.id }, project);
	}

	public remove(projectId: string) {
		return this.projectRepository.delete(projectId);
	}
}
