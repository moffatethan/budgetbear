import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Plaid extends Document {

  @Prop({ required: true })
  accessToken: string;
  
  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  requestId: string;

  @Prop({ type: Object })
  metadata: object;

  @Prop({ type: Types.ObjectId, ref: 'UserSchema' })
  userId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

}
export const PlaidSchema = SchemaFactory.createForClass(Plaid);