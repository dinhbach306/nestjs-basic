import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'User 1',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User age',
    minimum: 1,
    example: 20,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'User gender',
    example: 'Male',
    required: true,
  })
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    description: 'User address',
    example: 'Hanoi',
  })
  address: string;

  @ApiProperty({
    description: 'Created at',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Update at',
  })
  updatedAt: Date;
}
