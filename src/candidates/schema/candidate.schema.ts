import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ validateBeforeSave: true, timestamps: true })
export class Candidate {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  name: string;
}
