import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseCommon } from '../types/response-common';
import aqp from 'api-query-params';

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

  async findAll(
    page: number,
    limit: number,
    sortParam: string,
    qs: string,
  ): Promise<any> {
    try {
      const exclude = ['current', 'pageSize'];
      const { filter, sort, population } = aqp(qs);
      exclude.forEach((key) => delete filter[key]);
      const offset = (+page - 1) * +limit;
      const defaultLimit = +limit ? +limit : 10;

      const totalItems = await this.userModel.find(filter).countDocuments();
      const totalPages = Math.ceil(totalItems / defaultLimit);
      const result = await this.userModel
        .find(filter)
        .skip(offset)
        .limit(defaultLimit)
        .sort(sort as any)
        .populate(population)
        .exec();

      return {
        meta: {
          current: page,
          pageSize: limit,
          pages: totalPages,
          total: totalItems,
        },
        result,
      };
    } catch (error) {
      throw new BadRequestException('Bad request', error);
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

  async update(_id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return 'not found users';
    }
    const user = await this.userModel.updateOne(
      { _id: _id },
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
