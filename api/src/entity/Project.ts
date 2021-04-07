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
	title: string;

	@Column()
	description: string;

	@Column()
	created: Date;

	@OneToMany(() => Issue, (issue) => issue.project)
	issues: Issue[];

	@ManyToOne(() => User, (user) => user.issues)
	owner: User;
}
