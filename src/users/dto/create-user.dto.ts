import { IsEmail, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

class CompanyDto {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  gender: string;

  address: string;

  @IsNotEmpty()
  role: string;

  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;

  createdAt: Date;

  updatedAt: Date;
}
