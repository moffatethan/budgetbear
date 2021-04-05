import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Goal extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dueDate: Date;
  
  @Prop()
  monthlyContribution: string;

  @Prop()
  biWeeklyContribution: string;

  @Prop({ default: false })
  recurring: boolean;

  @Prop({ type: Types.ObjectId, ref: 'UserSchema' })
  userId: Types.ObjectId;

  @Prop()
  recurringType: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

}
export const GoalSchema = SchemaFactory.createForClass(Goal);