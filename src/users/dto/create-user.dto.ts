import { IsEmail, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

class CompanyDto {
  @ApiProperty({
    description: 'Company ID',
    type: mongoose.Schema.Types.ObjectId,
    example: '60f2e3f7d1c7d2b6f4c6e',
  })
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'Company name',
    example: 'Company 1',
  })
  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {
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
    description: 'User role',
    example: 'Admin',
    required: true,
  })
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    description: 'User company',
    type: CompanyDto,
  })
  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;

  createdAt: Date;

  updatedAt: Date;
}
