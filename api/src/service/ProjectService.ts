import { getCustomRepository } from 'typeorm';
import EntityException from '../common/exception/EntityException';
import Project from '../entity/Project';
import User from '../entity/User';
import ProjectRepository from '../repository/ProjectRepository';
import UserRepository from '../repository/UserRepository';

export default class ProjectService {
	private projectRepository: ProjectRepository;
	private userRepository: UserRepository;

	constructor() {
		this.projectRepository = getCustomRepository(ProjectRepository);
		this.userRepository = getCustomRepository(UserRepository);
	}

	public async get(userId: number): Promise<Project[]> {
		if (!userId || !(await this.userRepository.isExistsById(userId))) {
			throw new EntityException('Missing parameter');
		}

		return this.userRepository.getProjects(userId);
	}

	public async create(project: Project, userId: number) {
		if (
			!project ||
			!project.title ||
			!userId ||
			!(await this.userRepository.isExistsById(userId))
		) {
			throw new EntityException('Missing parameter');
		}

		project.owner = new User();
		project.owner.id = userId;
		project.created = new Date();

		return this.projectRepository.save(project);
	}

	public async addUser(id: string, userEmail: string) {
		const user = await this.userRepository.findOne({ email: userEmail });
		if (!user) {
			throw new EntityException('User not found');
		}

		return this.projectRepository.addUser(id, user);
	}

	public async update(id: string, project: Project) {
		if (!(await this.projectRepository.isExistsById(id))) {
			throw new EntityException('Project not found');
		}

		return this.projectRepository.update(id, project);
	}

	public async delete(id: string) {
		if (!(await this.projectRepository.isExistsById(id))) {
			throw new EntityException('Project not found');
		}

		return this.projectRepository.delete(id);
	}
}
