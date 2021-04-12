import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3)
  @IsString()
  readonly login: string;

  @Length(8)
  @IsString()
  readonly password: string;
}
