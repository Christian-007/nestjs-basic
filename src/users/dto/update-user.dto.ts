import { IsOptional, IsString, Length, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 30)
  firstName: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
