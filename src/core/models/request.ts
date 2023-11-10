import { AdminModel } from "./admin";
import { MemberModel } from "./member";
import { RequestTypeModel } from "./request-type";

export class Request {
  requestId: string;
  requestNo: string;
  dateRequested: Date;
  dateAssigned: Date | null;
  datePaid?: Date | null;
  dateProcessStarted?: Date | null;
  dateProcessEnd: Date | null;
  dateCompleted?: Date | null;
  dateClosed?: Date | null;
  dateLastUpdated: Date | null;
  requestStatus: string;
  description: string;
  assignedAdmin: AdminModel;
  requestType: RequestTypeModel;
  requestedBy: MemberModel;
  isPaid: boolean;
}
