import { IsEmail, IsNotEmpty } from 'class-validator';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	Unique,
} from 'typeorm';
import Issue from './Issue';
import UserProject from './UserProject';

@Entity()
@Unique(['username'])
@Unique(['email'])
export default class User {
	public constructor(init?: Partial<User>) {
		Object.assign(this, init);
	}

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

	@OneToMany(() => Issue, (issue) => issue.project)
	issues: Issue[];

	@OneToMany(() => UserProject, (userProject) => userProject.user)
	userProjects: UserProject[];
}
