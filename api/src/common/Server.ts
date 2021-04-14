import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import UserController from './../controllers/UserController';

export default class Server {
	private userController: UserController;
	private app: express.Application;
	private port: number;

	constructor() {
		this.app = express();
		this.configuration();
		this.controllers();
		this.routes();
		this.middlewares();
	}

	public configuration() {
		this.port = parseInt(process.env.PORT as string, 10);
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
	}

	public controllers() {
		this.userController = new UserController();
	}

	public routes() {
		this.app.get('/', (req: Request, res: Response) => {
			res.send('Hello world!');
		});
		this.app.use('/user/', this.userController.router);
	}

	public middlewares() {}

	public start() {
		this.app.listen(this.port, () => {
			console.log(`Listening on port ${this.port}`);
		});
	}
}
