import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(8)
  @IsString()
  readonly password: string;

  @IsPhoneNumber('RU')
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @Length(3)
  @IsString()
  readonly firstName: string;

  @Length(3)
  @IsString()
  readonly lastName: string;
}
