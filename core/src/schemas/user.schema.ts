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

  @Prop({ required: true, default: false })
  plaidLinked: boolean;

  @Prop({ type: [Types.ObjectId], ref: 'PlaidSchema', select: false })
  accessTokens: Types.ObjectId[];

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

}
export const UserSchema = SchemaFactory.createForClass(User);