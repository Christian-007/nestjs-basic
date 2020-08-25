import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  lastName: string;
}
