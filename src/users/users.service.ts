import { Inject, Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import CreateUserDto from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import PatchUserDto from './dto/patch-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private UserModel: Model<User>) {}

  async getUserByEmail(email: string) {
    return this.UserModel.findOne({ email });
  }

  async getUserById(id: string) {
    return this.UserModel.findById(id);
  }

  async findByIdAndUpdate(id: string, user: PatchUserDto) {
    return this.UserModel.findByIdAndUpdate(
      id,
      { $set: user }, // Only update the fields present in userData
      { new: true } // Return the updated document
    );
  }

  async createUser(user: CreateUserDto, tenantId: string) {
    user.password = await bcrypt.hash(user.password, 10);
    return this.UserModel.create({ ...user, tenantId });
  }

  async sendInvitationLink(email: string) {
    const invitationToken = nanoid();
    const user = await this.UserModel.findOneAndUpdate(
      { email },
      { invitationToken },
      { new: true }
    );

    //todo: send invitation email

    return { invitationToken, user };
  }
}
