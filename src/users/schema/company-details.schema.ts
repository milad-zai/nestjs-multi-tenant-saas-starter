import { Prop, Schema } from '@nestjs/mongoose';

// Sub-document for Company-related Details
@Schema({ _id: false })
export default class CompanyDetails {
  @Prop({ required: false })
  team?: string;

  @Prop({ required: false })
  department?: string;

  @Prop({ required: false })
  branch?: string;

  @Prop({ required: false })
  role?: string;
}
