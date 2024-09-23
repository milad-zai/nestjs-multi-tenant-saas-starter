import { Prop, Schema } from '@nestjs/mongoose';

// Sub-document for Personal Details
@Schema({ _id: false })
export default class PersonalDetails {
  @Prop({ required: false })
  dateOfBirth?: Date;

  @Prop({ required: false })
  gender?: string;

  @Prop({ required: false })
  phoneNumber?: string;

  @Prop({ required: false })
  address?: string;
}
