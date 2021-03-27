import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;

}