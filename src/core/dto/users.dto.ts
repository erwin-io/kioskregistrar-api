import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumberString,
  ArrayNotEmpty,
  IsArray,
  ValidateNested,
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsUppercase,
  Matches,
} from "class-validator";

export class DefaultAdminUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  mobileNumber: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => CreateAdminUserAccessDto)
  @ValidateNested()
  access: CreateAdminUserAccessDto[];
}

export class CreateAdminUserAccessDto {
  @IsNotEmpty()
  page: string;

  @IsNotEmpty()
  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  @IsBooleanString()
  view = false;

  @IsNotEmpty()
  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  @IsBooleanString()
  modify = false;
}

export class CreateAdminUserDto extends DefaultAdminUserDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  userProfilePic: any;
}

export class UpdateAdminUserDto extends DefaultAdminUserDto {
  @IsNotEmpty()
  adminCode: string;
}

export class MemberVerificationDto {
  @IsArray()
  memberCodes: string[] = [];
}

export class DefaultMemberDto {
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  @IsNumberString()
  mobileNumber: string;

  @IsNotEmpty()
  @IsDateString({ strict: true } as any)
  birthDate: Date;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsIn(["MALE", "FEMALE", "OTHERS"])
  @IsUppercase()
  gender: "MALE" | "FEMALE" | "OTHERS";

  @IsNotEmpty()
  courseTaken: string;

  @IsOptional()
  major: string;

  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  @IsBooleanString()
  isAlumni = false;

  @IsNotEmpty()
  @Matches(
    /^ *((\d *- *\d)|(\d{2} *- *\d{2})|(\d{3} *- *\d{3})|(\d{4} *- *\d{4})|(\d{5} *- *\d{5})) *$/,
    {
      message:
        "Invalid format for secondarySyGraduated, must match 0000-0000 format",
    }
  )
  schoolYearLastAttended: string;

  @IsNotEmpty()
  primarySchoolName = "";

  @IsNotEmpty()
  @Matches(
    /^ *((\d *- *\d)|(\d{2} *- *\d{2})|(\d{3} *- *\d{3})|(\d{4} *- *\d{4})|(\d{5} *- *\d{5})) *$/,
    {
      message:
        "Invalid format for secondarySyGraduated, must match 0000-0000 format",
    }
  )
  primarySyGraduated = "";

  @IsNotEmpty()
  secondarySchoolName = "";

  @IsNotEmpty()
  @Matches(
    /^ *((\d *- *\d)|(\d{2} *- *\d{2})|(\d{3} *- *\d{3})|(\d{4} *- *\d{4})|(\d{5} *- *\d{5})) *$/,
    {
      message:
        "Invalid format for secondarySyGraduated, must match 0000-0000 format",
    }
  )
  secondarySyGraduated = "";

  @IsOptional()
  birthCertFile: any;

  @IsOptional()
  userProfilePic: any;
}

export class UpdateMemberUserDto extends DefaultMemberDto {
  @IsNotEmpty()
  memberCode: string;
}