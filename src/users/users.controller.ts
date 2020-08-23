import { Controller, Get, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<GetUserDto[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Post()
  async create(@Body() newUser: CreateUserDto): Promise<GetUserDto> {
    const user = await this.usersService.create(newUser);
    const userDto: GetUserDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };

    return userDto;
  }
}
