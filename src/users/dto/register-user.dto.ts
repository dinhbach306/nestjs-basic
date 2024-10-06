import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterUserDto {
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

  createdAt: Date;

  updatedAt: Date;
}
