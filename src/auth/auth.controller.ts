import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';

import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { AccessToken } from './interfaces/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser): User {
    const { user } = request;
    user.password = undefined;

    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser): Promise<AccessToken> {
    return this.authService.login(request.user);
  }
}
