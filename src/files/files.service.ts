import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { IUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<File>,
  ) {}
  async create(createFileDto: CreateFileDto, user: IUser): Promise<File> {
    const file = await this.fileModel.create({
      ...createFileDto,
      createBy: {
        _id: user._id,
        username: user.name,
      },
    });
    return file;
  }

  async findAll(current: number, pageSize: number, qs: string) {
    const exclude = ['current', 'sort', 'pageSize'];
    const { filter, sort, population } = aqp(qs);

    exclude.forEach((key) => delete filter[key]);

    const offset = (+current - 1) * +pageSize;
    const defaultLimit = +pageSize ? +pageSize : 10;

    const totalItems = await this.fileModel.find(filter).countDocuments();
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.fileModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: current,
        pageSize: pageSize,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  findOne(id: string): Promise<File> {
    const file = this.fileModel.findById(id);
    return file;
  }

  update(id: string, updateFileDto: UpdateFileDto, user: IUser): Promise<File> {
    const file = this.fileModel.findByIdAndUpdate(id, {
      ...updateFileDto,
      updateBy: {
        _id: user._id,
        username: user.name,
      },
    });

    return file;
  }

  async remove(id: string | string[]) {
    let existFile;
    if (typeof id === 'object') {
      existFile = await this.fileModel.find({
        _id: { $in: id },
        isDeleted: false,
      });
    } else {
      existFile = await this.fileModel.find({
        _id: id,
        isDeleted: false,
      });
      console.log(existFile);
      existFile = existFile ? [existFile] : [];
    }

    if (existFile.length === 0 || existFile === undefined) {
      return { deleted: 0 };
    }

    let deleted = 0;
    for (const file of existFile) {
      await this.fileModel.findByIdAndUpdate(file._id, {
        isDeleted: true,
        deletedAt: new Date(),
      });

      deleted++;
    }
    return { deleted };
  }
}
