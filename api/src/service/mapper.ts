import { createMapper, mapFrom } from '@automapper/core';
import { classes } from '@automapper/classes';
import Issue from '../entity/Issue';
import { Mapper } from '@automapper/types';
import Project from '../entity/Project';
import ProjectDto from '../dtos/ProjectDto';

export const mapper = createMapper({
	name: 'my-mapper',
	pluginInitializer: classes,
});

export const initializeMapper = (mapper: Mapper) => {
	mapper.createMap(Project, ProjectDto).forMember(
		(projectdto) => projectdto.role,
		mapFrom((project) => project.userProjects[0].role)
	);
};
