import * as express from 'express';
import { getRepository, In } from 'typeorm';
import HttpException from '../common/exception/HttpException';
import SendError from '../common/utils/SendError';
import { Role } from '../entity/enum/Role';
import UserProject from '../entity/UserProject';

export const authorize = (permittedRoles: Role[]) => async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const userId = req.userId;
	if (!userId) {
		SendError(new HttpException(401, 'Session expired'), res);
	}

	const projectId = req.params.id;
	const userProjectRepository = getRepository(UserProject);
	const userProject = await userProjectRepository.findOne({
		where: {
			user: { id: userId },
			project: { id: projectId },
			role: In(permittedRoles),
		},
	});

	if (userProject) {
		next();
	} else {
		SendError(new HttpException(401, 'Unauthorized'), res);
	}
};
