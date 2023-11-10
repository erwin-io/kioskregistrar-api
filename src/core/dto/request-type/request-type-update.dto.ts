import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumberString,
  ArrayNotEmpty,
  ValidateNested,
  IsBooleanString,
} from "class-validator";
import { RequestRequirementDto, RequestTypeDto } from "./request-type.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRequestTypeDto extends RequestTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  requestTypeId: string;
}

export class UpdateRequestRequirementDto extends RequestRequirementDto {
  @ApiProperty()
  @IsNotEmpty()
  requestRequirementsId: string;
}
