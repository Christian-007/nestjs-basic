import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('Users Controller', () => {
  let userController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return all users when userController.findAll() is called', async () => {
    const mockUserList: User[] = [
      {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
      {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    ];

    jest.spyOn(usersService, 'findAll').mockResolvedValue(mockUserList);

    expect(await userController.findAll()).toBe(mockUserList);
  });
});
