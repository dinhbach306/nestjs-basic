import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { Public } from '../decorator/public.decorator';
import { ResponseCommon } from '../types/response-common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Public()
  signUp(@Body() req: SignupDto): Promise<ResponseCommon<any>> {
    return this.authService.signUp(req);
  }

  @Post('/signin')
  @Public()
  signIn(@Body() req: LoginDto): Promise<ResponseCommon<any>> {
    return this.authService.login(req);
  }
}
