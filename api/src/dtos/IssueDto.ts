import { Priority } from '../entity/enum/Priority';
import { State } from '../entity/enum/State';
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

	@AutoMap()
	state: string;

	@AutoMap()
	priority: string;
}
