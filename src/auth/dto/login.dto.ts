import { PickType } from '@nestjs/mapped-types';
import { SignupDto } from 'src/auth/dto/signup.dto';

export class LoginDto extends PickType(SignupDto, [
  'email',
  'password',
] as const) {}
