import SendError from '../common/utils/SendError';
import * as express from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../common/exception/HttpException';

export const auth = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			const token = authHeader.split(' ')[1];
			jwt.verify(token, process.env.SECRET_TOKEN, (err, userId) => {
				if (err) {
					throw new HttpException(401, 'Bad credentials');
				}

				req.userId = userId.userId;
				next();
			});
		} else {
			throw new HttpException(401, 'Unauthorized');
		}
	} catch (error) {
		SendError(error, res);
	}
};
