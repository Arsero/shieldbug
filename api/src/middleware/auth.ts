import * as express from 'express';
import jwt from 'jsonwebtoken';

export const auth = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, process.env.SECRET_KEY, (err, username) => {
			if (err) {
				return res.sendStatus(403);
			}

			req.username = username;
			next();
		});
	} else {
		res.status(401).send({
			error: 'Not authorized',
		});
	}
};
