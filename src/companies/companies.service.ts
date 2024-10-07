import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from 'src/companies/schema/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../users/user.interface';
import { Model } from 'mongoose';
import aqp from 'api-query-params';
import { ResponseCommon } from '../types/response-common';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    user: IUser,
  ): Promise<ResponseCommon<Company>> {
    const company = await this.companyModel.create({
      ...createCompanyDto,
      createBy: {
        _id: user._id,
        username: user.name,
      },
    });

    return {
      result: company,
    };
  }

  async findAll(page: number, limit: number, qs: string): Promise<any> {
    const exclude = ['current', 'sort', 'pageSize'];
    const { filter, sort, population } = aqp(qs);

    exclude.forEach((key) => delete filter[key]);

    const offset = (+page - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = await this.companyModel.find(filter).countDocuments();
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.companyModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: page, //Trang hiện tại
        pageSize: limit, //Số bản ghi trên 1 trang
        pages: totalPages, //Tổng số trang
        total: totalItems, //Tổng số bản ghi
      },
      result, //Danh sách bản ghi
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(_id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    const company = this.companyModel.findByIdAndUpdate(_id, {
      ...updateCompanyDto,
      updateBy: {
        _id: user._id,
        username: user.name,
      },
    });

    return company;
  }

  async softDeleteCompany(_ids: string[]): Promise<any> {
    const existCompany = await this.companyModel.find({
      _id: { $in: _ids },
      isDeleted: false,
    });

    if (!existCompany.length) {
      return 'Not found company';
    }

    let deleted = 0;
    for (const company of existCompany) {
      await this.companyModel.findByIdAndUpdate(company._id, {
        isDeleted: true,
        deletedAt: new Date(),
      });
      deleted++;
    }

    return { deleted };
  }
}
