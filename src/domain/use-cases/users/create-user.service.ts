import { Injectable } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user.interface';
import { CreateUserDto } from 'src/gateways/controllers/users/dtos/create-user.dto';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserService implements BaseUseCase {
  private readonly DEFAULT_SALT_ROUNDS = 10;
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  async execute(user: CreateUserDto): Promise<IUser> {
    const hashedPassword = await hash(user.password, this.DEFAULT_SALT_ROUNDS);
    const newUser = await this.usersRepository.add({
      ...user,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new Error('Failed to create user.');
    }

    return newUser;
  }
}
