import { Priority } from './enum/Priority';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './Project';
import { State } from './enum/State';
import { User } from './User';

@Entity()
export class Issue {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	lastUpdate: Date;

	@Column({
		type: 'enum',
		enum: State,
		default: State.Open,
	})
	state: State;

	@Column({
		type: 'enum',
		enum: Priority,
		default: Priority.Trivial,
	})
	priority: Priority;

	@ManyToOne(() => Project, (project) => project.issues)
	project: Project;

	@ManyToOne(() => User, (user) => user.issues)
	user: User;
}
