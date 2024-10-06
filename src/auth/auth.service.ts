import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { IUser } from '../users/user.interface';
import { ResponseCommon } from '../types/response-common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModal: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.
    return hash;
  };

  async signUp(req: SignupDto): Promise<ResponseCommon<any>> {
    const { name, email, password, age, gender, address } = req;

    const hashPassword = this.hashPassword(password);

    const user = await this.userModal.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      sub: 'token login',
      iss: 'from server',
    };

    const refreshToken = this.createRefreshToken(payload);

    const token = this.jwtService.sign(payload);

    return { result: { token, refreshToken } };
  }

  async login(req: LoginDto, res: Response): Promise<ResponseCommon<any>> {
    const { email, password } = req;
    const user: IUser = await this.userModal.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Username/password không hợp lệ');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Username/password không hợp lệ');
    }

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      sub: 'token login',
      iss: 'from server',
    };

    const refreshToken = this.createRefreshToken(payload);
    await this.userService.updateUserToken(refreshToken, user._id);

    //Clear old refresh token and set new refresh token
    res.clearCookie('refresh-token');
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    const token = this.jwtService.sign(payload);

    return {
      result: {
        token,
      },
    };
  }

  async refreshToken(
    refreshToken: string,
    res: Response,
  ): Promise<ResponseCommon<any>> {
    try {
      //Verify refresh token, If not valid or expired, throw error
      const refreshTokenPayload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_KEY_SECRET'),
      });

      //TODO: login with refresh token
      const user = await this.userModal.findOne({
        refreshToken: refreshToken,
      });
      if (!user || user.email !== refreshTokenPayload.email)
        throw new BadRequestException('Refresh not valid');

      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        sub: 'token login',
        iss: 'from server',
      };

      const newRefreshToken = this.createRefreshToken(payload);
      await this.userService.updateUserToken(newRefreshToken, user._id);

      res.cookie('refresh-token', newRefreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });

      const token = this.jwtService.sign(payload);
      return {
        result: {
          token,
        },
      };
    } catch (error) {
      throw new BadRequestException('Refresh not valid', error);
    }
  }

  createRefreshToken = (payload) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_KEY_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });
    return refreshToken;
  };
}
