import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumberString,
  ArrayNotEmpty,
  ValidateNested,
  IsBooleanString,
} from "class-validator";
export class RequestTypeDto {
  @IsNotEmpty()
  name: string;

  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  @IsBooleanString()
  authorizeACopy = false;

  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  fee: string;

  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  @IsBooleanString()
  isPaymentRequired = false;
}

export class UpdateRequestTypeDto extends RequestTypeDto {
  @IsNotEmpty()
  requestTypeId: string;
}

export class RequestRequirementDto {
  @IsNotEmpty()
  name: string;

  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  @IsBooleanString()
  requireToSubmitProof = false;
}

export class CreateRequestRequirementDto extends RequestRequirementDto {
  @IsNotEmpty()
  requestTypeId: string;
}

export class UpdateRequestRequirementDto extends RequestRequirementDto {
  @IsNotEmpty()
  requestRequirementsId: string;
}
