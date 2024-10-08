import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  create(): string {
    return 'create success';
  }

  findAll(): string {
    return 'findAll success';
  }

  findOne(): string {
    return 'findOne success';
  }

  update(): string {
    return 'update success';
  }

  delete(): string {
    return 'delete success';
  }

  updateMany(): string {
    return 'updateMany success';
  }
}
