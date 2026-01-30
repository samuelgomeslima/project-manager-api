import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Project name is required' })
  @IsString({ message: 'Project name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Project description is required' })
  @IsString({ message: 'Project description must be a string' })
  description: string;
}
