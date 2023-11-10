import { RequestRequirementModel } from "./request-requirements";

export class RequestTypeModel {
  requestTypeId: string;
  name: string;
  authorizeACopy: boolean;
  fee: string;
  isPaymentRequired: boolean;
  active: boolean;
  requestRequirements: RequestRequirementModel[];
}
