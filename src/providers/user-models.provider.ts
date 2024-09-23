import { Connection } from 'mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';

export const UserModels = {
  userModel: {
    provide: 'USER_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(User.name, UserSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
