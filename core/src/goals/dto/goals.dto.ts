import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGoalDTO {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsBoolean()
  @IsOptional()
  recurring: boolean;

  @IsString()
  @IsOptional()
  recurringType: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

}