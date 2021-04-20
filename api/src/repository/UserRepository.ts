import { EntityRepository, Repository } from 'typeorm';
import User from '../entity/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
	public async isExistsByProperty(
		partialUser?: Partial<User>
	): Promise<boolean> {
		const user = await this.findOne({
			select: ['id'],
			where: [partialUser],
		});

		return Boolean(user);
	}

	public async isExistsById(id: number): Promise<boolean> {
		const user = await this.findOne(id);
		return Boolean(user);
	}
}
