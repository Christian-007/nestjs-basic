import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { AccessToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await hash(registerUserDto.password, saltRounds);

    try {
      const createdUser = await this.usersService.create({
        ...registerUserDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;

      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async validateUser(email: string, plainTextPassword: string): Promise<User> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;

      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  login(user: User): AccessToken {
    const payload: TokenPayload = {
      email: user.email,
      sub: user.id, // JWT Standards
    };
    const token = this.jwtService.sign(payload); // generate JWT

    return {
      accessToken: token,
    };
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
