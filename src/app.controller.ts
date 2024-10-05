import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.appService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create() {
    return this.appService.create();
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete() {
    return this.appService.delete();
  }
}
