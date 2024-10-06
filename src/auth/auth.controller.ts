import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { Public } from '../decorator/public.decorator';
import { ResponseCommon } from '../types/response-common';
import { ResponseMessage } from '../decorator/response-message.decorator';
import { Request, Response } from 'express';
import { User } from '../decorator/user.decorator';
import { IUser } from '../users/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ResponseMessage('Sign up successfully')
  @Post('/sign-up')
  @Public()
  signUp(@Body() req: SignupDto): Promise<ResponseCommon<any>> {
    return this.authService.signUp(req);
  }

  @ResponseMessage('Sign in successfully')
  @Post('/sign-in')
  @Public()
  signIn(
    @Body() req: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseCommon<any>> {
    return this.authService.login(req, res);
  }

  @ResponseMessage('Get user information')
  @Get('/me')
  handleGetAccount(@User() user: any): ResponseCommon<any> {
    return { result: user };
  }

  @ResponseMessage('Refresh token successfully')
  @Public()
  @Get('/refresh-token')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = request.cookies['refresh-token'];

    return this.authService.refreshToken(refreshToken, res);
  }

  @ResponseMessage('Sign out successfully')
  @Post('/logout')
  handleLogout(@Res({ passthrough: true }) res: Response, @User() user: IUser) {
    return this.authService.handleLogout(res, user);
  }
}
