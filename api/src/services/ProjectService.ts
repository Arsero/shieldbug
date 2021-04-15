import { getRepository, Repository } from 'typeorm';
import EntityException from '../common/exceptions/EntityException';
import Project from '../entities/Project';
import User from '../entities/User';

export default class ProjectService {
	private projectRepository: Repository<Project>;
	private userRepository: Repository<User>;

	constructor() {
		this.projectRepository = getRepository(Project);
		this.userRepository = getRepository(User);
	}

	public async get(userId: number) {
		const user = await this.userRepository.findOne(userId, {
			relations: ['projects', 'projectsCreated'],
		});

		if (!user) {
			throw new EntityException('User not found');
		}

		return [...user.projectsCreated, ...user.projects];
	}

	public async create(project: Project, userId: number) {
		if (!project || !project.title || !userId) {
			throw new EntityException('Missing parameter');
		}

		project.owner = new User();
		project.owner.id = userId;
		project.created = new Date();
		project.users = [project.owner];

		return this.projectRepository.save(project);
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
