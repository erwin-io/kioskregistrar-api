export class ApiResponseModel<T> {
  data: T;
  message?: boolean;
  success?: boolean;
}
