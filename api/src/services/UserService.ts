import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
	private userRepository = getRepository(User);

	async create(user: User) {
		const secureUser = {
			...user,
			password: this.hashPassword(user.password),
		};

		return this.userRepository.create(secureUser);
	}

	async login(email: string, password: string) {
		if (!email || !password) {
			throw Error('Bad parameter');
		}

		const user = await this.userRepository.findOne({ email: email });
		if (!user) {
			throw Error('User not found');
		}

		if (bcrypt.compareSync(password, user.password)) {
			const email = user.email;
			return jwt.sign({ email }, process.env.SECRET_KEY, {
				algorithm: 'HS256',
				expiresIn: '24h',
			});
		}
	}

	private hashPassword(value: string) {
		return bcrypt.hashSync(value, 10);
	}
}
