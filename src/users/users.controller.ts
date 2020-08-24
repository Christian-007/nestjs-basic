import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { UsersService } from './users.service';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneParams } from './param/find-one.params';
import { RemoveParams } from './param/remove.params';
import { RemoveUserDto } from './dto/remove-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<GetUserDto[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams): Promise<GetUserDto> {
    const user = await this.usersService.findOne(params.id);
    return user;
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

  @Delete(':id')
  async remove(@Param() params: RemoveParams): Promise<RemoveUserDto> {
    await this.usersService.remove(params.id);
    const removeUserDto: RemoveUserDto = {
      message: 'OK',
    };

    return removeUserDto;
  }
}
