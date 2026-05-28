import { UserRole } from "shared-types/src/lib/user-role.enum";
import { JwtPayload } from "./jwt-payload.interface";

export interface RequestUser extends JwtPayload {
  accessToken: string;
  roles: UserRole[];
}
