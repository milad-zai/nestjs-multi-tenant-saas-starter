import { Injectable } from '@nestjs/common';
import { CreateUserTenantMappingDto } from './dto/create-user-tenant-mapping.dto';
import { InjectModel } from '@nestjs/mongoose';
import UserTenantMapping from './schema/user-tenant-mapping.schema';
import { ClientSession, Model } from 'mongoose';

@Injectable()
export class UserTenantMappingService {
  constructor(
    @InjectModel(UserTenantMapping.name)
    private UserTenantMappingModel: Model<UserTenantMapping>
  ) {}

  async getUserByEmail(email: string) {
    return this.UserTenantMappingModel.findOne({ email });
  }

  async create(
    createUserTenantMappingDto: CreateUserTenantMappingDto,
    session: ClientSession
  ) {
    return this.UserTenantMappingModel.create([createUserTenantMappingDto], {
      session,
    });
  }

  findOne(email: string) {
    return `This action returns a #${email} userTenantMapping`;
  }

  remove(email: string) {
    return `This action removes a #${email} userTenantMapping`;
  }
}
