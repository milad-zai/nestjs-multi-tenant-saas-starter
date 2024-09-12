import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import UserDto from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private UserModel: Model<User>) {}

  async getUserByEmail(email: string) {
    return this.UserModel.findOne({ email });
  }

  async createUser(user: UserDto, tenantId: string) {
    user.password = await bcrypt.hash(user.password, 10);
    return this.UserModel.create({ ...user, tenantId });
  }
}
