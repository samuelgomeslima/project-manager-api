import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsController } from './gateways/controllers/projects/projects.controller';
import { TasksController } from './gateways/controllers/tasks/tasks.controller';
import { UsersController } from './gateways/controllers/users/users.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectsController, TasksController, UsersController],
  providers: [AppService],
})
export class AppModule {}
