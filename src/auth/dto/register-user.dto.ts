import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;
}
