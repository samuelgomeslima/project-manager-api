import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IProject } from 'src/domain/interfaces/project.interface';
import { CreateProjectService } from 'src/domain/use-cases/projects/create-project.service';
import { GetAllProjectsService } from 'src/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from 'src/domain/use-cases/projects/get-project-by-id.service';
import { CreateProjectDto } from './dtos/create-project.dto';

const loggedUser = 1;

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectService,
    private readonly getAllProjectsUseCase: GetAllProjectsService,
    private readonly getProjectByIdUseCase: GetProjectByIdService,
  ) {}

  @Get()
  findAll(): Promise<IProject[]> {
    try {
      return this.getAllProjectsUseCase.execute(loggedUser);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get(':id')
  findById(@Req() request, @Param('id') id: number) {
    try {
      return this.getProjectByIdUseCase.execute({
        projectId: id,
        userId: loggedUser,
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  create(@Req() request, @Body() createProjectDto: CreateProjectDto) {
    try {
      return this.createProjectUseCase.execute({
        project: createProjectDto,
        userId: loggedUser,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
