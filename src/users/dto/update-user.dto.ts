import { IsOptional, IsString, Length, IsBoolean } from 'class-validator';

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
  @IsBoolean()
  isActive: boolean;
}
