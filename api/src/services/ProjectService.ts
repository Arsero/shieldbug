import { getRepository } from 'typeorm';
import { Project } from '../entities/Project';

export class ProjectService {
	private projectRepository = getRepository(Project);

	async findByUser(userId: number) {
		return this.projectRepository.find({ owner: { id: userId } });
	}

	async create(project: Project) {
		return this.projectRepository.create(project);
	}

	async update(project: Project) {
		return this.projectRepository.update({ id: project.id }, project);
	}

	async remove(projectId: string) {
		return this.projectRepository.delete(projectId);
	}
}
