import { RequestTypeModel } from "./request-type";

export class RequestRequirementModel {
  requestRequirementsId: string;
  name: string;
  requestType: RequestTypeModel;
  requireToSubmitProof: boolean;
  active: boolean;
}
