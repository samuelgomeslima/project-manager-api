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

const loggetUser = 1;

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly getAllTasksUseCase: GetAllTasksService,
    private readonly getTaskByIdUseCase: GetTaskByIdService,
    private readonly createTaskUseCase: CreateTaskService,
  ) {}

  @Get()
  findAll() {
    console.log('Getting all tasks');

    try {
      return this.getAllTasksUseCase.execute({ userId: loggetUser });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get(':id')
  findById(@Req() req, @Param('id') taskId: number) {
    console.log('Getting task by ID:', taskId);

    try {
      return this.getTaskByIdUseCase.execute({
        taskId: taskId,
        userId: loggetUser,
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
    console.log('Creating task with data:', createTaskDto);

    try {
      return this.createTaskUseCase.execute({
        task: createTaskDto,
        userId: loggetUser,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
