import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumberString,
  ArrayNotEmpty,
  ValidateNested,
  IsBooleanString,
  IsEnum,
} from "class-validator";
export class RequestDto {
  @IsNotEmpty()
  requestedById: string;

  @IsNotEmpty()
  requestTypeId: string;

  @IsNotEmpty()
  description: string;
}
