import { Injectable } from '@angular/core';
import { DataServiceError } from './../../store/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class GlobalErrorHandler {
  private readonly genericErrorKey: string =
    'Please contact your System Administrator and state error code {{errorCode}}.';

  showError(
    contextualErrorKey: string,
    errorAction: any,
    interpolationParams: any = {}
  ) {
    // switch (error.errorCode) {
    // default:
    const dsError = errorAction as DataServiceError<any>;
    this.translateService
      .get([contextualErrorKey, this.genericErrorKey], {
        errorCode: dsError.errorCode,
        ...interpolationParams,
      })
      .subscribe((errorMsgs: string[]) => {
        // this.toastService.errorToast(`${errorMsgs[contextualErrorKey]}. ${errorMsgs[this.genericErrorKey]}`);
        console.log(errorMsgs);
      })
      .unsubscribe();
    // break;
    // }
  }

  handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res, requestData);
      console.error(error);
      if (error.errorCode === 'E161') {
        this.translateService
          .get('error.bookingFlow.customSlotLength')
          .subscribe((res: string) => {
            // this.toastService.errorToast(res);
            console.log(res);
          })
          .unsubscribe();
      }
      return throwError(error);
    };
  }

  constructor(private translateService: TranslateService) {}
}
