import { HttpErrorResponse } from "@angular/common/http";

export const qsystemEndpoint = '/qsystem/rest';
export const restEndpoint = '/rest/servicepoint';

export const ERROR_CODE = 'error_code';

export class DataServiceError<T> {
    public errorCode: string = '0';
  
    constructor(public responseData: any, public requestData: T) {
      this.parseErrors(responseData);
    }
  
    private parseErrors(responseData: HttpErrorResponse) {
      if (responseData) {
        this.errorCode = responseData.headers.get(ERROR_CODE) || '0';
      }
    }
  }