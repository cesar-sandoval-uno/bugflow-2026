import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from '../../interfaces/auth/request-user.interface';
import { RequestWithUser } from '../../interfaces/auth/request-with-user.interface';
import { User } from '../users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUser => {
    const req: RequestWithUser = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

export const CurrentDbUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const req: RequestWithUser = ctx.switchToHttp().getRequest();
    return req.dbUser;
  }
);
