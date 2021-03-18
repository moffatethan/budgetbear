import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {

  @IsEmail()
  @IsNotEmpty()
  readonly emailAddress: string;

  @IsNotEmpty()
  readonly password: string

}
