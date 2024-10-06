import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { IUser } from '../users/user.interface';
import { ResponseCommon } from '../types/response-common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModal: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.
    return hash;
  };

  async signUp(req: SignupDto): Promise<ResponseCommon<any>> {
    const { name, email, password, age } = req;

    const hashPassword = this.hashPassword(password);

    const user = await this.userModal.create({
      name,
      email,
      password: hashPassword,
      age,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = this.jwtService.sign({
      id: user._id,
      name: user.name,
      email: user.email,
      sub: 'token login',
      iss: 'from server',
    });
    return { result: token };
  }

  async login(req: LoginDto): Promise<ResponseCommon<any>> {
    const { email, password } = req;
    const user: IUser = await this.userModal.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Username/password không hợp lệ');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Username/password không hợp lệ');
    }

    const token = this.jwtService.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    return { result: token };
  }
}
