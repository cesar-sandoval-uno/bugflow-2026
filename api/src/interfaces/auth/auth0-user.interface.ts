import { UserRole } from "shared-types/src/lib/user-role.enum";

export interface Auth0User {
  sub: string;
  email: string;
  name: string;
  nickname?: string;
  picture?: string;
  email_verified?: boolean;
  'https://bugflow-api/roles'?: UserRole[];
}
