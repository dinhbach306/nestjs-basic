import { OmitType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends OmitType(RegisterUserDto, [
  'password',
] as const) {
  @IsNotEmpty()
  _id: string;
}
