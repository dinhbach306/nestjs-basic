import { Timestamp } from '@google-cloud/firestore';

export class CreateUserDto {
  name: string;

  email: string;

  // password: string;
  //
  // age: number;
  //
  // address: string;

  createdAt: Timestamp;

  updatedAt: Timestamp;
}
