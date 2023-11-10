import { FileModel } from "./files";
import { UserModel } from "./users";

export class MemberModel {
  memberId: string;
  memberCode: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  birthDate: string;
  address: string;
  gender: string;
  courseTaken: string;
  major: string;
  isAlumni: boolean;
  schoolYearLastAttended: string;
  primarySchoolName: string;
  primarySyGraduated: string;
  secondarySchoolName: string;
  secondarySyGraduated: string;
  isVerified: boolean;
  birthCertFile: FileModel;
  user: UserModel;
}
