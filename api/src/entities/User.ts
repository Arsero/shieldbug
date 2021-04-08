import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	OneToMany,
} from 'typeorm';
import { Issue } from './Issue';
import { Project } from './Project';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@ManyToMany(() => Project)
	@JoinTable()
	projects: Project[];

	@OneToMany(() => Issue, (issue) => issue.project)
	issues: Issue[];

	@OneToMany(() => Project, (project) => project.owner)
	projectsCreated: Project[];
}
