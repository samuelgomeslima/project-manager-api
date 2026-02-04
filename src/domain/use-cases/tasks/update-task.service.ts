import { Injectable } from '@nestjs/common';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';
import { UpdateTaskDto } from 'src/gateways/controllers/tasks/dtos/update-task.dto';
import { ITask } from 'src/domain/interfaces/task.interface';

@Injectable()
export class UpdateTaskService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
  ) {}

  async execute(payload: {
    task: UpdateTaskDto;
    userId: number;
  }): Promise<ITask> {
    const userData = await this.usersRepository.findById(payload.userId);

    await this.tasksRepository.updateById(payload.task.id, payload.task);
    return await this.tasksRepository.findById(userData.id, payload.task.id);
  }
}
