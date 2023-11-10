import { Transform } from "class-transformer";
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsNotEmpty,
  IsNumberString,
  ArrayNotEmpty,
  IsOptional,
  IsDateString,
  IsBooleanString,
  IsArray,
} from "class-validator";
import { Match } from "./match.decorator.dto";
import { DefaultAdminUserDto, DefaultMemberDto } from "./users.dto";

export class LogInDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateAdminUserResetPasswordDto {
  @IsNotEmpty()
  adminCode: string;

  @IsNotEmpty()
  password: string;

  @Match("password")
  @IsNotEmpty()
  confirmPassword: string;
}


export class RegisterMemberUserDto extends DefaultMemberDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateMemberUserResetPasswordDto {
  @IsNotEmpty()
  memberCode: string;

  @IsNotEmpty()
  password: string;

  @Match("password")
  @IsNotEmpty()
  confirmPassword: string;
}
