import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserService } from 'src/domain/use-cases/users/create-user.service';
import { GetUserByIdService } from 'src/domain/use-cases/users/get-user-by-id.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdService,
    private readonly createUserUseCase: CreateUserService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    console.log('Getting user by ID:', id);

    try {
      return this.getUserByIdUseCase.execute(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('Creating user with data:', createUserDto);

    try {
      return this.createUserUseCase.execute(createUserDto);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
