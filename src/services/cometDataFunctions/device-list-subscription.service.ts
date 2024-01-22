import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { IDevice } from 'src/models/IDevice';
import { DeviceDispatchers, DeviceSelectors } from 'src/store';
import { ToastService } from '../util/toast.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceListSubscriptionService implements OnInit {
  private subscriptions: Subscription = new Subscription();
  public deviceList$!: Observable<IDevice[]>;
  public deviceListSubscription : any;
  public updatingdeviceArray : any[] = [];

  constructor(
    private deviceDispatchers: DeviceDispatchers,
    private deviceSelectors: DeviceSelectors,
    private translateService: TranslateService,
    private toastService: ToastService
  ) {     this.deviceList$ = this.deviceSelectors.deviceList$;}

  ngOnInit(){

  }

  UpdatigDevices(device :IDevice, timestamp:any){
    const newValue = {device,timestamp}
    this.updatingdeviceArray.push(newValue);

    console.log('nippa0=>',this.updatingdeviceArray);
    this.countTime(timestamp);
  }

  removeDevice(device1:any){
    const index = this.updatingdeviceArray.findIndex(data => data.device.unitId === device1.device.unitId);
    if (index !== -1) {
      this.updatingdeviceArray.splice(index, 1);
    }
    console.log('nippa=>',this.updatingdeviceArray)
  }

  getArray(): IDevice[] {
    return this.updatingdeviceArray;
  }

  countTime(currentTimestamp:any){
    const targetTimestamp = currentTimestamp + 60000;

    setInterval(() => {
      this.updatingdeviceArray.forEach(element => {
        if((element.timestamp+60000)<= targetTimestamp){
          const updatedDevice = {
            isLoader : false,
         };
         this.deviceDispatchers.setLoader(element.device.unitId, false);

          this.translateService
          .get('label.list.no.update')
          .subscribe((label: string) => {
            this.toastService.errorToast(label);
          })
          .unsubscribe();
          this.removeDevice(element);
        }
      });
    }, 70000);
  }

}
