import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';

dotenv.config();

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

createConnection()
	.then(async (connection) => {
		/* -- Expres -- */
		const app = express();
		app.use(helmet());
		app.use(cors());
		app.use(express.json());

		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	})
	.catch((error) => console.log(error));
