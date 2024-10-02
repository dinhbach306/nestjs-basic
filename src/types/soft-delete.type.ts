import { Prop } from '@nestjs/mongoose';

export const IS_DELETED_FIELD = 'isDeleted';
export const DELETED_AT_FIELD = 'deletedAt';

export class SoftDelete {
  @Prop()
  [IS_DELETED_FIELD]: boolean;

  @Prop()
  [DELETED_AT_FIELD]: Date | null;
}
