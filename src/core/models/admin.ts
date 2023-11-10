import { UserModel } from "./users";

export class AdminModel {
  adminId: string;
  adminCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  mobileNumber: string;
  user: UserModel;
}
