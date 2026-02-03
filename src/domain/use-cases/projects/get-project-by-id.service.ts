import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { IProject } from 'src/domain/interfaces/project.interface';

@Injectable()
export class GetProjectByIdService implements BaseUseCase {
  constructor(
    private readonly projectsRepository: ProjectsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: {
    userId: number;
    projectId: number;
  }): Promise<IProject> {
    const userData = await this.usersRepository.findById(payload.userId);
    const project = await this.projectsRepository.findById(
      userData.id,
      payload.projectId,
    );

    if (!project) {
      throw new Error(
        `Project with ID ${payload.projectId} not found or inaccessible.`,
      );
    }

    return project;
  }
}
