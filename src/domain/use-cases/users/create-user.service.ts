import { Injectable } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user.interface';
import { CreateUserDto } from 'src/gateways/controllers/users/dtos/create-user.dto';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class CreateUserService implements BaseUseCase {
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  async execute(user: CreateUserDto): Promise<IUser> {
    const newUser = await this.usersRepository.add(user);

    if (!newUser) {
      throw new Error('Failed to create user.');
    }

    return newUser;
  }
}
