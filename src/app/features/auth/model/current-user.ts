import { Permission } from "./permission";
import { Role } from "./role";


export interface CurrentUser {
  id: number;
  username: string;
  role?: Role;
  tenant?: { id: number; name: string};
  permissions: Permission[];
}

