import { Injectable } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrService: ToastrService) {}

  private toastrOptions: Object = {
    // positionClass: 'centered',
    messageClass: 'qm-toast__message',
    easing: 'ease-in-out',
    closeButton: false,
    timeOut: 3500,
    //  disableTimeOut: true
  };

  private successOptions: Object = {
    ...this.toastrOptions,
    closeButton: false,
    toastClass: 'toast qm-toast qm-toast--success',
  };

  private errorOptions: Object = {
    ...this.toastrOptions,
    closeButton: false,
    toastClass: 'toast qm-toast qm-toast--danger',
  };
  setToastContainer(toastContainer: any) {
    this.toastrService.overlayContainer = toastContainer;
  }

  successToast(text: string) {
    return this.toastrService.success(text, '', this.successOptions);
  }

  errorToast(text: string) {

    this.toastrService.error(text, '', this.errorOptions);
  }
}
