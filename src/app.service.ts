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

  delete(): string {
    return 'delete success';
  }
}
