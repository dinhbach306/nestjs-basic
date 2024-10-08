import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Public } from '../decorator/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { User } from 'src/decorator/user.decorator';
import { IUser } from 'src/users/user.interface';

@ApiTags('File')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('fileUpload'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          // Mime type: image/jpg, image/jpeg, image/png, image/gif
          fileType: /image\/(jpg|jpeg|png|gif)/,
        })
        .addMaxSizeValidator({ maxSize: 1024 * 1024 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return { result: file, file };
  }

  @ResponseMessage('Create file successfully')
  @Post()
  create(@Body() createFileDto: CreateFileDto, @User() user: IUser) {
    return this.filesService.create(createFileDto, user);
  }

  @ResponseMessage('Get all files successfully')
  @Get()
  findAll(
    @Query('current') current: number,
    @Query('pageSize') pageSize: number,
    @Query() qs: string,
  ) {
    return this.filesService.findAll(+current, +pageSize, qs);
  }

  @ResponseMessage('Get file successfully')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @ResponseMessage('Update file successfully')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto,
    @User() user: IUser,
  ) {
    return this.filesService.update(id, updateFileDto, user);
  }

  @ResponseMessage('Remove file successfully')
  @Delete(':id')
  remove(@Param('id') id: string | string[]) {
    return this.filesService.remove(id);
  }
}
