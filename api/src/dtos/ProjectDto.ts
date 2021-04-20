import { AutoMap } from '@automapper/classes';

export default class ProjectDto {
	@AutoMap()
	id: string;

	@AutoMap()
	title: string;

	@AutoMap()
	description: string;

	@AutoMap()
	created: Date;

	@AutoMap()
	role: string;
}
