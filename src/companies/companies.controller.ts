import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { User } from '../decorator/user.decorator';
import { IUser } from '../users/user.interface';
import { ResponseMessage } from '../decorator/response-message.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get()
  @ResponseMessage('Get all companies')
  findAll(
    @Query('current') page: number,
    @Query('pageSize') limit: number,
    @Query() qs: string,
  ) {
    return this.companiesService.findAll(+page, +limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':_id')
  update(
    @Param('_id') _id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: IUser,
  ) {
    return this.companiesService.update(_id, updateCompanyDto, user);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string[]) {
    return this.companiesService.softDeleteCompany(_id);
  }
}
