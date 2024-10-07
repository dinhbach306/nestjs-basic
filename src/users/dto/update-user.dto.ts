import { OmitType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends OmitType(RegisterUserDto, [
  'password',
] as const) {
  @IsNotEmpty()
  @ApiProperty({
    description: 'User id',
    example: '123456',
    required: true,
  })
  _id: string;
}
