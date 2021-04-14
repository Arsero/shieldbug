import User from './../entities/User';
import express, { Request, Response, Router } from 'express';
import HttpException from '../common/exceptions/HttpException';
import UserService from '../services/UserService';
import SendError from '../common/utils/SendError';

export default class UserController {
	public router: Router;
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
		this.router = express.Router();
		this.routes();
	}

	public login = async (req: Request, res: Response) => {
		try {
			const [email, password] = [req.body.email, req.body.password];
			const token = await this.userService.login(email, password);

			res.status(200).send(token);
		} catch (error) {
			SendError(new HttpException(401, error.message), res);
		}
	};

	public signup = async (req: Request, res: Response) => {
		try {
			const user = req.body as User;
			console.log(this);
			const newUser = await this.userService.create(user);

			res.status(200).send(newUser);
		} catch (error) {
			SendError(error, res);
		}
	};

	public routes() {
		this.router.post('/login', this.login);
		this.router.post('/signup', this.signup);
	}
}
