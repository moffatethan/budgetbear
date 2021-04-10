import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Goal extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  dueDate: Date;
  
  @Prop({ required: true })
  monthlyContribution: number;

  @Prop({ required: true })
  biWeeklyContribution: number;

  @Prop({ default: false })
  recurring: boolean;

  @Prop({ type: Types.ObjectId, ref: 'UserSchema' })
  userId: Types.ObjectId;

  @Prop({ default: "none" })
  recurringType: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

}
export const GoalSchema = SchemaFactory.createForClass(Goal);