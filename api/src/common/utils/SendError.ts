import express from 'express';
import EntityException from '../exception/EntityException';
import HttpException from '../exception/HttpException';

export default (err: Error, res: express.Response) => {
	let httpException: HttpException;

	console.debug(err.message);
	if (err instanceof HttpException) {
		httpException = err;
	} else if (err instanceof EntityException) {
		httpException = new HttpException(400, err.message);
	} else {
		httpException = new HttpException();
	}

	res.status(httpException.statusCode).json({
		status: httpException.status,
		statusCode: httpException.statusCode,
		message: httpException.message,
	});
};
