import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseCommon } from '../types/response-common';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.
    return hash;
  };

  async create({
    name,
    email,
    password,
    age,
    gender,
    address,
    role,
    company,
    createdAt,
    updatedAt,
  }): Promise<ResponseCommon<User>> {
    const hashPassword = this.hashPassword(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role,
      company,
      createdAt,
      updatedAt,
    });
    return {
      result: user,
    };
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      this.logger.error('Error fetching users', error.stack);
      throw error;
    }
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found users';
    }
    const user = this.userModel.findOne({
      _id: id,
    });
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(updateUserDto._id)) {
      return 'not found users';
    }
    const user = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
    return user;
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found users';
    }
    this.userModel.deleteOne({
      _id: id,
    });

    return 'delete user success';
  }

  updateUserToken = async (refreshToken: string, _id: any) => {
    const update = await this.userModel.updateOne(
      { _id: _id },
      { refreshToken: refreshToken },
    );

    return update;
  };
}
