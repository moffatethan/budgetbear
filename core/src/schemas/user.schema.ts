import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string

  @Prop()
  goals: Types.ObjectId[];

  @Prop()
  connections: Types.ObjectId[]

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
