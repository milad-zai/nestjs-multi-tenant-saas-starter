import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import PatchUserDto from './dto/patch-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //patch user
  /* async patchUser(id: string, userData: PatchUserDto) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    await user.save();
    return user;
  } */

  @Patch(':id')
  async patchUser(@Param('id') id: string, @Body() userData: PatchUserDto) {
    const updatedUser = this.usersService.findByIdAndUpdate(id, userData);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  //send invitation link
  /* async sendInvitationLink(email: string) {
    return this.usersService.sendInvitationLink(email);
  } */

  //accept invitation
  /* async acceptInvitation(token: string, userData: CompleteRegistrationDto) {
    const user = await this.userTenantMappingService.findUserByToken(token);
    if (!user) throw new BadRequestException('Invalid or expired token');

    // Complete the registration
    user.password = bcrypt.hashSync(userData.password, 10);
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.isActive = true;
    user.invitationToken = null;

    await user.save();
  } */
}
