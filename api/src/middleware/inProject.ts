import * as express from 'express';
import { getCustomRepository } from 'typeorm';
import HttpException from '../common/exception/HttpException';
import SendError from '../common/utils/SendError';
import IssueRepository from '../repository/IssueRepository';
import ProjectRepository from '../repository/ProjectRepository';

export const userIsOwner = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const projectRepository = getCustomRepository(ProjectRepository);
	const id = req.params.id;
	const userId = req.userId;

	if (!id || (await projectRepository.isOwner(id, userId))) {
		next();
	} else {
		SendError(
			new HttpException(
				401,
				'The project is not found or you are not the owner'
			),
			res
		);
	}
};

export const userIsInProject = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const projectRepository = getCustomRepository(ProjectRepository);
	const id = req.params.id;
	const userId = req.userId;

	if (!id || (await projectRepository.isInProject(id, userId))) {
		next();
	} else {
		SendError(
			new HttpException(
				401,
				'The project is not found or you are not in'
			),
			res
		);
	}
};

export const issueInProject = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const issueRepository = getCustomRepository(IssueRepository);
	const projectId = req.params.id;
	const issueId = req.params.issueId;

	if (
		!projectId ||
		!issueId ||
		(await issueRepository.isInProject(Number(issueId), projectId))
	) {
		next();
	} else {
		SendError(new HttpException(401, 'The issue is not found'), res);
	}
};
