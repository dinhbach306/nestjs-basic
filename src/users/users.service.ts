import { Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from 'src/users/document/user.document';
import { CollectionReference, Timestamp } from '@google-cloud/firestore';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  constructor(
    @Inject(UserDocument.collectionName)
    private userCollection: CollectionReference<UserDocument>,
  ) {}

  async create({ name, email, createdAt, updatedAt }): Promise<UserDocument> {
    const docRef = this.userCollection.doc(name);
    const createAtMillis = dayjs(createdAt).valueOf();
    const updatedAtMillis = dayjs(updatedAt).valueOf();
    await docRef.set({
      name,
      email,
      createdAt: Timestamp.fromMillis(createAtMillis),
      updatedAt: Timestamp.fromMillis(updatedAtMillis),
    });
    const todoDoc = await docRef.get();
    const todo = todoDoc.data();
    return todo;
  }

  async findAll(): Promise<UserDocument[]> {
    const snapshot = await this.userCollection.get();
    const users: UserDocument[] = [];
    snapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
