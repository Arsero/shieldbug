import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import ProjectController from '../controllers/ProjectController';
import UserController from './../controllers/UserController';

export default class Server {
	private app: express.Application;
	private port: number;
	private userController: UserController;
	private projectController: ProjectController;

	constructor() {
		this.app = express();
		this.configuration();
		this.controllers();
		this.routes();
	}

	public configuration() {
		this.port = parseInt(process.env.PORT as string, 10);
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
	}

	public controllers() {
		this.userController = new UserController();
		this.projectController = new ProjectController();
	}

	public routes() {
		this.app.use('/user/', this.userController.router);
		this.app.use('/project/', this.projectController.router);
	}

	public start() {
		this.app.listen(this.port, () => {
			console.log(`Listening on port ${this.port}`);
		});
	}
}
