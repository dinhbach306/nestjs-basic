import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SoftDeleteSchema } from '../../types/soft-delete.type';
import { IsEnum } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends SoftDeleteSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  @IsEnum(['admin', 'user'])
  role: string;

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };

  @Prop()
  refreshToken: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: Object })
  createBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updateBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deleteBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
