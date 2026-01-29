import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUsersRepository } from 'src/domain/repositories/users-repository.interface';
import { IUser } from 'src/domain/interfaces/user.interface';

@Injectable()
export class UsersRepositoryService
  extends Repository<UserEntity>
  implements IUsersRepository
{
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  findById(id: number): Promise<IUser | null> {
    return this.findOneBy({ id });
  }

  add(payload: DeepPartial<IUser>): Promise<IUser> {
    return this.save(payload);
  }
}
