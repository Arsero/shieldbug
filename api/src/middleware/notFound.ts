import express from 'express';
import HttpException from '../common/exceptions/HttpException';
import SendError from '../common/utils/SendError';

export const notFound = (req: express.Request, res: express.Response) => {
	SendError(new HttpException(404, 'Not Found'), res);
};
