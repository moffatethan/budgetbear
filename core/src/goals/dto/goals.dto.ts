import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class CreateGoalDTO {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsBoolean()
  @IsNotEmpty()
  recurring: boolean;

  @IsString()
  recurringType: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

}