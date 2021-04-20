import { AutoMap } from '@automapper/classes';

export default class IssueDto {
	@AutoMap()
	id: number;

	@AutoMap()
	title: string;

	@AutoMap()
	description: string;

	@AutoMap()
	lastUpdate: Date;

	state: string;

	priority: string;
}
