import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestUser } from '../../interfaces/auth/request-user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      'roles',
      [
        context.getHandler(),
        context.getClass(),
      ]
    );

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: RequestUser = request.user;

    const dbUser = await this.usersService.findOrCreateFromAuth0(user);

    request.dbUser = dbUser;

    return requiredRoles.includes(dbUser.role);
  }
}

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private usersService: UsersService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const user: RequestUser = request.user;

//     const dbUser = await this.usersService.findOrCreateFromAuth0(user);

//     request.dbUser = dbUser;

//     return user['https://bugflow-api/roles']?.some(role =>
//       role === 'admin'
//       || role === 'developer'
//       || role === 'tester'
//     ) || false;
//   }
// }
