import { IProject } from './project.interface';
import { IUser } from './user.interface';

export interface ITask {
  id: number;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  project: IProject;
  user: IUser;
}
