import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ validateBeforeSave: true, timestamps: true })
export class Auth {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    select: false,
  })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
