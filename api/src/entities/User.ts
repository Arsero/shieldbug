import { IsEmail, IsNotEmpty } from 'class-validator';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	OneToMany,
	Unique,
} from 'typeorm';
import Issue from './Issue';
import Project from './Project';

@Entity()
@Unique(['username'])
@Unique(['email'])
export default class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty({ message: 'The username is required' })
	username: string;

	@Column()
	@IsEmail({}, { message: 'Incorrect email' })
	@IsNotEmpty({ message: 'The email is required' })
	email: string;

	@Column()
	@IsNotEmpty({ message: 'The password is required' })
	password: string;

	@ManyToMany(() => Project)
	@JoinTable()
	projects: Project[];

	@OneToMany(() => Issue, (issue) => issue.project)
	issues: Issue[];

	@OneToMany(() => Project, (project) => project.owner)
	projectsCreated: Project[];
}
