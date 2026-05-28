import { UserRole } from './user-role.enum';

export interface User {
  id: string;
  auth0Id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export type CreateUserPayload = {
  auth0Id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
};
export type UpdateUserPayload = Partial<CreateUserPayload>;
