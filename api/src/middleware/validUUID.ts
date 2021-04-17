import * as express from 'express';
import HttpException from '../common/exception/HttpException';
import SendError from '../common/utils/SendError';
import validate from 'uuid-validate';

export const validUUID = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const id = req.params.id;
	console.log(req.url);

	if (id && !validate(id)) {
		SendError(new HttpException(400, 'Invalid format UUID'), res);
	} else {
		next();
	}
};
