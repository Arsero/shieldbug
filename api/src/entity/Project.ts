import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Issue } from './Issue';

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	created: Date;

	@Column()
	description: string;

	@OneToMany(() => Issue, (issue) => issue.project)
	issues: Issue[];
}
