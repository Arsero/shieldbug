import { IsDate, IsNotEmpty } from 'class-validator';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToOne,
} from 'typeorm';
import { Issue } from './Issue';
import { User } from './User';

@Entity()
export class Project {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@IsNotEmpty({ message: 'The title is required' })
	title: string;

	@Column()
	@IsNotEmpty({ message: 'The description is required' })
	description: string;

	@Column()
	@IsNotEmpty({ message: 'The created date is required' })
	@IsDate()
	created: Date;

	@OneToMany(() => Issue, (issue) => issue.project)
	issues: Issue[];

	@ManyToOne(() => User, (user) => user.issues)
	owner: User;
}
