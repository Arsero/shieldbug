import { Priority } from './enum/Priority';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './Project';
import { State } from './enum/State';
import { User } from './User';
import { IsDate, IsNotEmpty } from 'class-validator';

@Entity()
export class Issue {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty({ message: 'The title is required' })
	title: string;

	@Column()
	@IsNotEmpty({ message: 'The description is required' })
	description: string;

	@Column()
	@IsNotEmpty({ message: 'The last update date is required' })
	@IsDate()
	lastUpdate: Date;

	@Column('int')
	state: State;

	@Column('int')
	priority: Priority;

	@ManyToOne(() => Project, (project) => project.issues)
	project: Project;

	@ManyToOne(() => User, (user) => user.issues)
	user: User;
}
