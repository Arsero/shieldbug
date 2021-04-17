import { EntityRepository, Repository } from 'typeorm';
import Project from '../entity/Project';
import User from '../entity/User';

@EntityRepository(Project)
export default class ProjectRepository extends Repository<Project> {
	public create(project: Project, userId: number): Promise<Project> {
		project.owner = new User();
		project.owner.id = userId;
		project.created = new Date();
		project.users = [project.owner];

		return this.save(project);
	}

	public update();
}
