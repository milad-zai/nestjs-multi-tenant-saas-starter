import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import PersonalDetails from './personal-details.schema';
import CompanyDetails from './company-details.schema';

@Schema()
export class User extends Document {
  //Personal details sub document
  @Prop({ type: PersonalDetails })
  personalDetails: PersonalDetails;

  //Company details sub document
  @Prop({ type: CompanyDetails })
  companyDetails: CompanyDetails;

  @Prop({ required: true })
  tenantId: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  invitationToken?: string;
  @Prop({ default: false })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
