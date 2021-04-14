import { getConnection, Repository } from 'typeorm';
import User from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import EntityException from '../common/exceptions/EntityException';

export default class UserService {
	private userRepository: Repository<User>;

	constructor() {
		this.userRepository = getConnection().getRepository(User);
	}

	public async create(user: User) {
		if (!user || !user.email || !user.password || !user.username) {
			throw new EntityException('Missing parameter');
		}

		await this.userRepository
			.findOne({
				where: [{ username: user.username }, { email: user.email }],
			})
			.then((userDb) => {
				throw new EntityException('User already exists');
			});

		const secureUser = {
			...user,
			password: this.hashPassword(user.password),
		};

		return this.userRepository.save(secureUser);
	}

	public login = async (email: string, password: string) => {
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
		} else {
			throw new Error('Bad credentials');
		}
	};

	private hashPassword = (value: string) => {
		return bcrypt.hashSync(value, 10);
	};
}
