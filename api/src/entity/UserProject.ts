import { Entity, Column, ManyToOne } from 'typeorm';
import { Role } from './enum/Role';
import Project from './Project';
import User from './User';

@Entity()
export default class UserProject {
	public constructor(init?: Partial<UserProject>) {
		Object.assign(this, init);
	}

	@Column('text')
	role: Role;

	@ManyToOne(() => User, (user) => user.userProjects, {
		primary: true,
		onDelete: 'CASCADE',
	})
	user: User;

	@ManyToOne(() => Project, (project) => project.userProjects, {
		primary: true,
		onDelete: 'CASCADE',
	})
	project: Project;
}
