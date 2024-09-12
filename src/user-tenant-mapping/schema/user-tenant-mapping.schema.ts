import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tenant } from 'src/tenants/tenant.schema';
import { Document } from 'mongoose';

@Schema()
export default class UserTenantMapping extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: String, ref: 'Tenant' })
  tenantId: Tenant;
}

export const UserTenantMappingSchema =
  SchemaFactory.createForClass(UserTenantMapping);
