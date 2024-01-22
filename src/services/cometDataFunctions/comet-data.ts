export enum PUBLIC_EVENTS {
  SYNC_UNIT_INIT = 'SYNC_UNIT_INIT',
  SYNC_UNIT_INFO = 'SYNC_UIT_INFO',
  SYNC_UNIT_LOGS = 'SYNC_UNIT_LOGS',
  CONNECTED_DEVICES = 'CONNECTED_DEVICES',
  SYNC_UPDATE_ERROR_STATUS = 'SYNC_UPDATE_ERROR_STATUS',
  RESET = 'RESET',
}

import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { DeviceDispatchers, DeviceSelectors } from 'src/store';
import { Store } from '@ngrx/store';
import { ToastService } from '../util/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { IDevice } from 'src/models/IDevice';
import { DeviceListSubscriptionService } from './device-list-subscription.service';

@Injectable()
export class CometData implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public deviceList$!: Observable<IDevice[]>;
  public deviceListSubscription : any;

  constructor(
    private deviceDispatchers: DeviceDispatchers,

    private toastService: ToastService,
    private translateService: TranslateService,
    private deviceSelectors: DeviceSelectors,
    private deviceListsubscriptionService : DeviceListSubscriptionService
  ) {
    this.deviceList$ = this.deviceSelectors.deviceList$;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    console.log('destroyed');
    this.deviceDispatchers.resetDeviceList();
  }

  receiveEvent(msg: any) {
    var processedEvent :any;
   //console.log('Event =', msg);

    try {
      processedEvent = JSON.parse(msg.data);
      console.log('info =', processedEvent);

    } catch (err) {
      return;
    }

    if (processedEvent.M === 'E') {
      console.log('evnt', processedEvent.E.evnt);
      switch (processedEvent.E.evnt) {
        case PUBLIC_EVENTS.SYNC_UNIT_INIT:
          {
            const array = this.deviceListsubscriptionService.getArray();

            array.forEach((data:any) => {
              if(data.device.isLoader && (data.device.unitId == processedEvent.E.prm.unitId)){

                this.translateService
                .get('label.list.sucess.update')
                .subscribe((label: string) => {
                    this.toastService.successToast(label);
                })
                .unsubscribe();

                const updatedDevice = {
                  isLoader : false,
                  connected : processedEvent.E.prm.connected,
                  lastUpdateTime :processedEvent.E.prm.lastUpdateTime,
                  unitId : processedEvent.E.prm.unitId,
                  unitName : processedEvent.E.prm.unitInfo.appInfo.unitId,
                  deviceId : processedEvent.E.prm.deviceId,
                  unitInfo: processedEvent.E.prm.unitInfo,
               };
               this.deviceDispatchers.editedselectedDevice(updatedDevice);
               this.deviceListsubscriptionService.removeDevice(data);
              }
            });

            break;
          }

        case PUBLIC_EVENTS.SYNC_UNIT_INFO:{break;}
        case PUBLIC_EVENTS.SYNC_UPDATE_ERROR_STATUS:
          {
            console.log('processedEvent.E=',processedEvent);
            this.translateService
              .get('label.list.sucess.update')
              .subscribe((label: string) => {
                this.toastService.successToast(label);
              })
              .unsubscribe();



          break;
        }
        case PUBLIC_EVENTS.SYNC_UNIT_INFO : {
          break;
        }
        case PUBLIC_EVENTS.SYNC_UPDATE_ERROR_STATUS: {
          console.log('processedEvent.E=', processedEvent);
          this.translateService
            .get('label.list.no.update')
            .subscribe((label: string) => {
              this.toastService.errorToast(label);
            })
            .unsubscribe();
            break;
          }
        case PUBLIC_EVENTS.SYNC_UNIT_LOGS:
          {
            this.deviceDispatchers.getDeviceLogs({
              payload: processedEvent.E.prm.deviceLogs,
            });

          const updatedDevice = {
            isLoaderDeviceLogs: false,
            unitId: processedEvent.E.prm.unitId,
          };
          this.deviceDispatchers.editselectedLogs(updatedDevice);
          break;
        }

        case PUBLIC_EVENTS.CONNECTED_DEVICES: {
          const connectedDevices = processedEvent.E.prm.deviceList;
          this.deviceDispatchers.getConnectedDevices(connectedDevices);
          break;
        }

        default:
          break;
      }
    }else if (processedEvent.M === 'R') {

      const connectedDevices = processedEvent.R.cfg.systemUnits;
      setTimeout(() => {
        this.deviceDispatchers.getConnectedDeviceList(connectedDevices);
      },2);

    }
  }
}
