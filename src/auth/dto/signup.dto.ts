import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmail({}, { message: 'email address is required' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password is too short' })
  password: string;

  @IsNumber()
  age: number;

  createdAt: Date;

  updatedAt: Date;
}
