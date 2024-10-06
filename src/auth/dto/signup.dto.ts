import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be more than 6 characters' })
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
