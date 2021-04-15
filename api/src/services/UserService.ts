import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import EntityException from '../common/exceptions/EntityException';

export default class UserService {
	private userRepository: Repository<User>;

	constructor() {
		this.userRepository = getRepository(User);
	}

	public async create(user: User) {
		if (!user || !user.email || !user.password || !user.username) {
			throw new EntityException('Missing parameter');
		}

		const userDb = await this.userRepository.findOne({
			where: [{ username: user.username }, { email: user.email }],
		});

		if (userDb) {
			throw new EntityException('User already exists');
		}

		const secureUser = {
			...user,
			password: this.hashPassword(user.password),
		};

		return this.userRepository.save(secureUser);
	}

	public async login(email: string, password: string) {
		if (!email || !password) {
			throw new EntityException('Missing parameter');
		}

		const user = await this.userRepository.findOne({ email: email });
		if (!user) {
			throw new EntityException('User not found');
		}

		if (bcrypt.compareSync(password, user.password)) {
			const userId = user.id;
			return jwt.sign({ userId }, process.env.SECRET_TOKEN, {
				algorithm: 'HS256',
				expiresIn: '24h',
			});
		} else {
			throw new EntityException('Username or password is incorrect');
		}
	}

	private hashPassword = (value: string) => {
		return bcrypt.hashSync(value, 10);
	};
}
