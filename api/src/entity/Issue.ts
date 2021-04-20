import { Priority } from './enum/Priority';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Project from './Project';
import { State } from './enum/State';
import User from './User';
import { IsDate, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

@Entity()
export default class Issue {
	@AutoMap()
	@PrimaryGeneratedColumn()
	id: number;

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
	@IsNotEmpty({ message: 'The last update date is required' })
	@IsDate()
	lastUpdate: Date;

	@Column('text')
	state: State;

	@Column('text')
	priority: Priority;

	@ManyToOne(() => Project, (project) => project.issues)
	project: Project;

	@ManyToOne(() => User, (user) => user.issues)
	user: User;
}
