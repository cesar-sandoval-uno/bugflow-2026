import { Request } from 'express';
import { User } from '../../modules/users/entities/user.entity';
import { RequestUser } from './request-user.interface';

export interface RequestWithUser extends Request {
  user: RequestUser;
  dbUser: User;
}
