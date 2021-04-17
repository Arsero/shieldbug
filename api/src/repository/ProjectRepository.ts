import { EntityRepository, Repository } from 'typeorm';
import EntityException from '../common/exception/EntityException';
import Project from '../entity/Project';
import User from '../entity/User';

@EntityRepository(Project)
export default class ProjectRepository extends Repository<Project> {
	public async isOwner(id: string, userId: number): Promise<boolean> {
		const project = await this.findOne(id, {
			relations: ['owner'],
		});

		return project.owner.id == userId;
	}

	public async isInProject(id: string, userId: number): Promise<boolean> {
		const project = await this.findOne(id, {
			relations: ['owner', 'users'],
		});

		const user = project.users.find((user) => user.id == userId);
		return project.owner.id == userId || Boolean(user);
	}

	public async addUser(id: string, user: User): Promise<Project> {
		const project = await this.findOne(id, {
			relations: ['owner', 'users'],
		});

		if (!project) {
			throw new EntityException('Project does not exist');
		}

		if (
			project.owner.id == user.id ||
			project.users.find((u) => u.id == user.id)
		) {
			throw new EntityException('User already in project');
		}

		project.users.push(user);
		return this.save(project);
	}

	public async isExistsById(id: string): Promise<boolean> {
		const project = await this.findOne(id);
		return Boolean(project);
	}
}
