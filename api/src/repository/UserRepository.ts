import { EntityRepository, Repository } from 'typeorm';
import EntityException from '../common/exception/EntityException';
import Project from '../entity/Project';
import User from '../entity/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
	public async isExistsByProperty(
		username: string,
		email: string
	): Promise<boolean> {
		const user = await this.findOne({
			select: ['id'],
			where: [{ username: username }, { email: email }],
		});

		return Boolean(user);
	}

	public async isExistsById(id: number): Promise<boolean> {
		const user = await this.findOne(id);
		return Boolean(user);
	}

	public async getProjects(id: number): Promise<Project[]> {
		const user = await this.findOne(id, {
			relations: ['projects', 'projectsCreated'],
		});

		if (!user) {
			throw new EntityException('User not found');
		}

		return [...user.projectsCreated, ...user.projects];
	}
}
