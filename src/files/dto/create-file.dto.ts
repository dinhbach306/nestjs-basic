import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateFileDto {
  @ApiProperty({
    required: true,
    description: 'Name of file',
    example: 'File',
  })
  @IsNotEmpty({ message: 'Name không được để trống' })
  @IsString({ message: 'Name phải là kiểu string' })
  name: string;

  @ApiProperty({
    required: true,
    description: 'Skill of file',
    example: 'Skill',
  })
  @IsArray()
  @IsString({ each: true, message: 'Mảng phải là kiểu string' })
  @ArrayMinSize(1, { message: 'Skills không được để trống' })
  skills: string[];

  @ApiProperty({
    required: true,
    description: 'Company',
    example: {
      _id: '60f1b6b3b3b3b3b3b3b3b3b3',
      name: 'Company 1',
    },
  })
  @IsNotEmptyObject({}, { message: 'Company không được để trống' })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };

  @ApiProperty({
    required: true,
    description: 'Location of file',
    example: 'Location',
  })
  @IsNotEmpty({ message: 'Location không được để trống' })
  @IsString({ message: 'Location phải là kiểu string' })
  location: string;

  @ApiProperty({
    required: true,
    description: 'Salary of file',
    example: 1000,
  })
  @IsNotEmpty({ message: 'Salary không được để trống' })
  @IsNumber({}, { message: 'Salary phải là kiểu number' })
  salary: number;

  @ApiProperty({
    required: true,
    description: 'Quantity of file',
    example: 100,
  })
  @IsNotEmpty({ message: 'Quantity không được để trống' })
  @IsNumber({}, { message: 'Quantity phải là kiểu number' })
  quantity: number;

  @ApiProperty({
    required: true,
    description: 'Level of file',
    example: 'Level',
  })
  @IsNotEmpty({ message: 'Level không được để trống' })
  @IsString({ message: 'Level phải là kiểu string' })
  level: string;

  @ApiProperty({
    required: false,
    description: 'Description of file',
    example: 'Description',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: true,
    description: 'Start date of file',
    example: '2021-07-17T00:00:00.000Z',
  })
  @IsDate({ message: 'Start date phải là kiểu date' })
  startDate: Date;

  @ApiProperty({
    required: true,
    description: 'End date of file',
    example: '2021-07-17T00:00:00.000Z',
  })
  @IsDate({ message: 'End date phải là kiểu date' })
  endDate: Date;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  @IsOptional()
  isActive?: boolean;
}
