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

		return this.projectRepository.add(project, userId);
	}

	public async addUserToProject(
		idProject: string,
		ownerId: number,
		userEmail: string
	) {
		const projectDb = await this.projectRepository.findOne(
			{ id: idProject },
			{ relations: ['owner', 'users'] }
		);

		if (!projectDb) {
			throw new EntityException('Project does not exist');
		}

		if (ownerId != projectDb.owner.id) {
			throw new EntityException('You are not the owner');
		}

		if (projectDb.owner.email == userEmail) {
			throw new EntityException("You can't add the owner");
		}

		const user = await this.userRepository.findOne({ email: userEmail });
		if (!user) {
			throw new EntityException('User not found');
		}

		if (projectDb.users.find((u) => u.id === user.id)) {
			throw new EntityException('User already in this project');
		}

		projectDb.users.push(user);
		return this.projectRepository.save(projectDb);
	}

	public async update(id: string, project: Project, userId: number) {
		const projectDb = await this.projectRepository.findOne(id, {
			relations: ['owner'],
		});

		if (!projectDb || projectDb.owner.id != userId) {
			throw new EntityException('Project does not exist');
		}

		project.id = id;
		return this.projectRepository.update(id, project);
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
