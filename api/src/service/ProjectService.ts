import {
	DeleteResult,
	getCustomRepository,
	getRepository,
	Repository,
	UpdateResult,
} from 'typeorm';
import EntityException from '../common/exception/EntityException';
import { Role } from '../entity/enum/Role';
import Project from '../entity/Project';
import User from '../entity/User';
import UserProject from '../entity/UserProject';
import ProjectRepository from '../repository/ProjectRepository';
import UserRepository from '../repository/UserRepository';

export default class ProjectService {
	private projectRepository: ProjectRepository;
	private userRepository: UserRepository;
	private userProjectRepository: Repository<UserProject>;

	constructor() {
		this.projectRepository = getCustomRepository(ProjectRepository);
		this.userRepository = getCustomRepository(UserRepository);
		this.userProjectRepository = getRepository(UserProject);
	}

	public async get(userId: number): Promise<Project[]> {
		const userProjects = await this.userProjectRepository.find({
			where: { user: { id: userId } },
			relations: ['project'],
		});

		const projects = userProjects.map((userProject) => {
			userProject.project.userProjects = [userProject];
			return userProject.project;
		});
		return projects;
	}

	public create(project: Project, userId: number) {
		if (!project || !project.title) {
			throw new EntityException('Missing parameter');
		}

		project.created = new Date();
		project.userProjects = [
			new UserProject({
				role: Role.Owner,
				user: new User({ id: userId }),
			}),
		];

		return this.projectRepository.save(project);
	}

	public async addUser(id: string, userEmail: string): Promise<Project> {
		const user = await this.userRepository.findOne({ email: userEmail });
		if (!user) {
			throw new EntityException('User not found');
		}

		const project = await this.projectRepository.findOne(id);
		if (!project) {
			throw new EntityException('Project not found');
		}

		project.userProjects = [
			new UserProject({
				role: Role.User,
				user: user,
			}),
		];

		return this.projectRepository.save(project);
	}

	public update(id: string, project: Project): Promise<UpdateResult> {
		return this.projectRepository.update(id, project);
	}

	public delete(id: string): Promise<DeleteResult> {
		return this.projectRepository.delete(id);
	}
}
