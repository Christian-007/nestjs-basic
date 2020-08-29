import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const mockUsersRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should call usersRepository.find() when usersService.findAll() is called', async () => {
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

    jest.spyOn(usersRepository, 'find').mockResolvedValue(mockUserList);

    expect(await usersService.findAll()).toBe(mockUserList);
  });

  it('should call usersRepository.findOne(id) when usersService.findOne(id) is called', async () => {
    const mockUserId = faker.random.uuid();

    const findOneSpy = jest.spyOn(usersRepository, 'findOne');
    await usersService.findOne(mockUserId);

    expect(findOneSpy).toHaveBeenCalledWith(mockUserId);
  });

  it('should call usersRepository.save(user) when usersService.create(user) is called', async () => {
    const mockCreateUserDto: CreateUserDto = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const saveSpy = jest.spyOn(usersRepository, 'save');
    await usersService.create(mockCreateUserDto);

    expect(saveSpy).toBeCalledWith(mockCreateUserDto);
  });

  it('should call usersRepository.delete(id) when usersService.remove(id) is called', async () => {
    const mockUserId = faker.random.uuid();

    const deleteSpy = jest.spyOn(usersRepository, 'delete');
    await usersService.remove(mockUserId);

    expect(deleteSpy).toHaveBeenCalledWith(mockUserId);
  });
});
