import { mapper, initializeMapper } from '../service/Mapper';
import { notFound } from './../middleware/notFound';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import ProjectController from '../controller/ProjectController';
import UserController from '../controller/UserController';
import IssueController from '../controller/IssueController';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

export default class Server {
	private app: express.Application;
	private port: number;
	private userController: UserController;
	private projectController: ProjectController;
	private issueController: IssueController;

	constructor() {
		this.app = express();
		this.configuration();
		this.controllers();
		this.routes();
		this.middlewares();
		this.useMapper();
	}

	public configuration() {
		this.port = parseInt(process.env.PORT as string, 10);
		var accessLogStream = fs.createWriteStream(
			path.join(__dirname, 'access.log'),
			{ flags: 'a' }
		);
		this.app.use(morgan('combined', { stream: accessLogStream }));
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
	}

	public controllers() {
		this.userController = new UserController();
		this.projectController = new ProjectController();
		this.issueController = new IssueController();
	}

	public routes() {
		this.app.use('/users/', this.userController.router);
		this.app.use('/projects/', this.projectController.router);
		this.app.use('/projects/', this.issueController.router);
	}

	public middlewares() {
		this.app.use(notFound);
	}

	public useMapper() {
		initializeMapper(mapper);
	}

	public start() {
		this.app.listen(this.port, () => {
			console.log(`Listening on port ${this.port}`);
		});
	}
}
