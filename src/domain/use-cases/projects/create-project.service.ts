import { Injectable } from '@nestjs/common';
import { IProject } from 'src/domain/interfaces/project.interface';
import { CreateProjectDto } from 'src/gateways/controllers/projects/dtos/create-project.dto';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class CreateProjectService implements BaseUseCase {
  constructor(
    private readonly projectsRepository: ProjectsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: {
    project: CreateProjectDto;
    userId: number;
  }): Promise<IProject> {
    const userData = await this.usersRepository.findById(payload.userId);

    const createdProject = await this.projectsRepository.add({
      name: payload.project.name,
      description: payload.project.description,
      user: { id: userData.id },
    });

    if (!createdProject) {
      throw new Error('Project could not be created');
    }
    return createdProject;
  }
}
