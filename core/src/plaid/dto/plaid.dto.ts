import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class PublicTokenDTO {

  @IsNotEmpty()
  @IsString()
  publicToken: string;

  @IsObject()
  metadata: object;

}