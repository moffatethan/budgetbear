import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
  
  @Prop({ required: true, unique: true })
  emailAddress: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: [Types.ObjectId], ref: 'GoalSchema' })
  goals: Types.ObjectId[];

}
export const UserSchema = SchemaFactory.createForClass(User);