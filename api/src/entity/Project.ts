import { AutoMap } from '@automapper/classes';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Issue from './Issue';
import UserProject from './UserProject';

@Entity()
export default class Project {
	public constructor(init?: Partial<Project>) {
		Object.assign(this, init);
	}

	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@AutoMap()
	@Column()
	@IsNotEmpty({ message: 'The title is required' })
	title: string;

	@AutoMap()
	@Column()
	@IsNotEmpty({ message: 'The description is required' })
	description: string;

	@AutoMap()
	@Column()
	@IsNotEmpty({ message: 'The created date is required' })
	@IsDate()
	created: Date;

	@OneToMany(() => Issue, (issue) => issue.project)
	issues: Issue[];

	@OneToMany(() => UserProject, (userProject) => userProject.project, {
		cascade: true,
	})
	userProjects: UserProject[];
}
