import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserRole } from '@bugflow-2026/shared-types';
import { CurrentUser } from '../auth/current-user.decorator';
import { RequestUser } from '../../interfaces/auth/request-user.interface';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('me')
  async getMe(@CurrentUser() user: RequestUser) {
    return await this.usersService.findOrCreateFromAuth0(user);
  }

  @Get('assignable')
  async findAssignable() {
    return this.usersService.findAssignableUsers();
  }

  @Patch(':id/role')
  async updateRole(
    @Param('id') id: string,
    @Body('role') role: UserRole
  ) {
    return await this.usersService.updateRole(id, role);
  }

}
