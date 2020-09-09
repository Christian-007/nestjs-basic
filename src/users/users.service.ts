import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = this.usersRepository.findOne(id);
    if (user) {
      return user;
    }

    throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }

    throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
  }

  async create(newUser: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = newUser.email;
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.password = newUser.password;
    const createdUser = await this.usersRepository.save(user);

    return createdUser;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    try {
      await this.usersRepository.update(id, user);
      const updatedUser = await this.usersRepository.findOneOrFail(id);

      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
