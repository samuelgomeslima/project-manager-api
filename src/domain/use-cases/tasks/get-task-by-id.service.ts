import { Injectable } from '@nestjs/common';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { BaseUseCase } from '../base-use-case';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { ITask } from 'src/domain/interfaces/task.interface';

@Injectable()
export class GetTaskByIdService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
  ) {}

  async execute(payload: { taskId: number; userId: number }): Promise<ITask> {
    const userData = await this.usersRepository.findById(payload.userId);

    const task = await this.tasksRepository.findById(
      userData.id,
      payload.taskId,
    );

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }
}
