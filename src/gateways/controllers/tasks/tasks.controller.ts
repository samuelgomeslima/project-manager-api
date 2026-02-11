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
import { CreateTaskService } from 'src/domain/use-cases/tasks/create-task.service';
import { GetAllTasksService } from 'src/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from 'src/domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request.interface';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly getAllTasksUseCase: GetAllTasksService,
    private readonly getTaskByIdUseCase: GetTaskByIdService,
    private readonly createTaskUseCase: CreateTaskService,
  ) {}

  @Get()
  findAll(@Req() request) {
    console.log('Getting all tasks');

    try {
      const loggedUser = (request as AuthenticatedRequest).user;
      return this.getAllTasksUseCase.execute({ userId: loggedUser.sub });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get(':id')
  findById(@Req() request, @Param('id') taskId: number) {
    console.log('Getting task by ID:', taskId);

    try {
      const loggedUser = (request as AuthenticatedRequest).user;
      return this.getTaskByIdUseCase.execute({
        taskId: taskId,
        userId: loggedUser.sub,
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  create(@Req() request, @Body() createTaskDto: CreateTaskDto) {
    console.log('Creating task with data:', createTaskDto);

    try {
      const loggedUser = (request as AuthenticatedRequest).user;
      return this.createTaskUseCase.execute({
        task: createTaskDto,
        userId: loggedUser.sub,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
