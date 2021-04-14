import SendError from '../common/utils/SendError';
import * as express from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../common/exceptions/HttpException';

export const auth = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			const token = authHeader.split(' ')[1];

			jwt.verify(token, process.env.SECRET_KEY, (err, username) => {
				if (err) {
					throw new HttpException(401, 'Not authorized');
				}

				req.username = username;
				next();
			});
		} else {
			throw new HttpException(400, 'Bad header');
		}
	} catch (error) {
		SendError(error, res);
	}
};
