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

	public async update(id: string, project: Project, userId: number) {
		const projectDb = await this.projectRepository.findOne(id, {
			relations: ['owner'],
		});

		if (!projectDb || projectDb.owner.id != userId) {
			throw new EntityException('Project does not exist');
		}

		project.id = id;
		return this.projectRepository.update({ id: id }, project);
	}

	public async delete(id: string, userId: number) {
		const projectDb = await this.projectRepository.findOne(id, {
			relations: ['owner'],
		});

		if (!projectDb || projectDb.owner.id != userId) {
			throw new EntityException('Project does not exist');
		}

		return this.projectRepository.delete(id);
	}
}
