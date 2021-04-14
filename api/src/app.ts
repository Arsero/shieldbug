import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';
import Server from './common/Server';
dotenv.config();

createConnection()
	.then(async (connection) => {
		const server: Server = new Server();

		server.start();
	})
	.catch((error) => console.log(error));
