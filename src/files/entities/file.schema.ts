import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/types/soft-delete.type';

@Schema({ timestamps: true })
export class File extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Array })
  skills: string[];

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };

  @Prop()
  location: string;

  @Prop({ type: Number })
  salary: number;

  @Prop({ type: Number })
  quantity: number;

  @Prop()
  level: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: Boolean, default: true, required: true })
  isActive: boolean;
}

export type FileDocument = HydratedDocument<File>;

export const FileSchema = SchemaFactory.createForClass(File);
