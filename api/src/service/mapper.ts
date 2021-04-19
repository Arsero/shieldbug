import { createMapper, mapFrom } from '@automapper/core';
import { classes } from '@automapper/classes';
import IssueDto from '../dtos/IssueDto';
import Issue from '../entity/Issue';
import { State } from '../entity/enum/State';
import { Priority } from '../entity/enum/Priority';
import { Mapper } from '@automapper/types';

export const mapper = createMapper({
	name: 'mymapper',
	pluginInitializer: classes,
});

export const initializeMapper = (mapper: Mapper) => {
	mapper
		.createMap(Issue, IssueDto)
		.forMember(
			(issuedto) => issuedto.state,
			mapFrom((issue) => {
				switch (issue.state) {
					case State.Open:
						return 'open';
					case State.InProgress:
						return 'in progress';
					case State.ToBeTested:
						return 'to be tested';
					case State.Closed:
						return 'closed';
				}
			})
		)
		.forMember(
			(issuedto) => issuedto.priority,
			mapFrom((issue) => {
				switch (issue.priority) {
					case Priority.Trivial:
						return 'trivial';
					case Priority.Minor:
						return 'minor';
					case Priority.Major:
						return 'major';
					case Priority.Critical:
						return 'critical';
					case Priority.Blocker:
						return 'blocker';
				}
			})
		);
};
