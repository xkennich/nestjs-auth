import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  readonly accessToken: string;
}
