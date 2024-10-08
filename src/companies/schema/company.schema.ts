import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../../types/soft-delete.type';

// defind soft delete field name

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
