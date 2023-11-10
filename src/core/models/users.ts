import { AccessModel } from "./access";
import { FileModel } from "./files";

export class UserModel {
  userId: string;
  userName: string;
  userType: string;
  access: AccessModel[];
  accessGranted: boolean;
  active: boolean;
  profileFile: FileModel;
}
