import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const IS_DELETED_FIELD = 'isDeleted';
export const DELETED_AT_FIELD = 'deletedAt';

export class BaseSchema {
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

  @Prop({ default: false })
  [IS_DELETED_FIELD]: boolean;

  @Prop()
  [DELETED_AT_FIELD]: Date | null;
}
