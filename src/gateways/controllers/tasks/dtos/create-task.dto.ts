import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Task name must not be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Task status must not be empty' })
  @IsString()
  status: 'pending' | 'in-progress' | 'completed';

  @IsNumber()
  projectId: number;
}
