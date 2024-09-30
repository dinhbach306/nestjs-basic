import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
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
    createdAt,
    updatedAt,
  }): Promise<User> {
    const hashPassword = this.hashPassword(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      createdAt,
      updatedAt,
    });
    return user;
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `Remove public #${id} user`;
  }
}
