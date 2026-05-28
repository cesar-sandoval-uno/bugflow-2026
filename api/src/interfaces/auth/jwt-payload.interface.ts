import { UserRole } from "shared-types/src/lib/user-role.enum";

export interface JwtPayload {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  scope: string;
  azp: string;
  'https://bugflow-api/roles'?: UserRole[];
}
