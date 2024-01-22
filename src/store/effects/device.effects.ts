import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription, startWith, switchMap, tap } from 'rxjs';
import { ToastService } from 'src/services/util/toast.service';
import { GlobalErrorHandler } from '../../services/util/global-error-handler.service';
import { IAppState } from '../reducers';
import { DeviceDataService, DeviceSelectors } from '../services';
import * as DeviceActions from './../actions';
import { state } from '@angular/animations';
import { reducer } from '../reducers/system-info.reducer';
import { IDevice } from 'src/models/IDevice';
import { DeviceListSubscriptionService } from 'src/services/cometDataFunctions/device-list-subscription.service';

const toAction = DeviceActions.toAction();

@Injectable()
export class DeviceEffects {
  public selectedDevice$!: Observable<IDevice | null>;
  private subscriptions: Subscription = new Subscription();
  public unitId: string | undefined;
  constructor(
    private store: Store<IAppState>,
    private actions$: Actions,
    private deviceDataService: DeviceDataService,
    private errorHandler: GlobalErrorHandler,
    private translateService: TranslateService,
    private store$: Store<IAppState>,
    private toastService: ToastService,
    private deviceSelectors: DeviceSelectors,
    private deviceListsubscriptionService : DeviceListSubscriptionService
  ) {
    this.selectedDevice$ = this.deviceSelectors.selectedDevice$;
  }

  getDeviceByIdFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DeviceActions.GET_DEVICE_BY_ID_FAIL),
        tap((action: DeviceActions.GetDeviceByIdFail) =>
          this.errorHandler.showError('Fail to fetch units', action.payload)
        ),
        switchMap(() => [])
      ),
    { dispatch: false }
  );

  getDeviceByIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DeviceActions.GET_DEVICE_BY_ID_SUCCESS),
        tap((action: DeviceActions.GetDeviceByIdSuccess) => {
          if (action.payload.length === 0) {
            this.translateService
              .get('label.list.no.device')
              .subscribe((label: string) => {
                this.toastService.errorToast(label);
              })
              .unsubscribe();
          }
        })
      ),
    { dispatch: false }
  );

  updateDeviceLocal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.SELECTED_DEVICE_UPDATE_LOCAL),
      switchMap((action: DeviceActions.SelectedDeviceUpdateLocal) =>
        toAction(
          this.deviceDataService.updateDeviceLocal(action.payload),
          DeviceActions.SelectedDeviceUpdateLocalSuccess,
          DeviceActions.SelectedDeviceUpdateLocalFail
        )
      )
    )
  );
  selectedDeviceUpdateLocalSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DeviceActions.SELECTED_DEVICE_UPDATE_LOCAL_SUCCESS),
        tap((action: DeviceActions.SelectedDeviceUpdateLocalSuccess) => {
          setTimeout(() => {
            this.translateService
              .get('label.list.local.device.update')
              .subscribe((label: string) => {
                this.toastService.successToast(label);
              })
              .unsubscribe();
          }, 2500);
        })
      ),
    { dispatch: false }
  );

  selectedDeviceUpdateLocalFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DeviceActions.SELECTED_DEVICE_UPDATE_LOCAL_FAIL),
        tap((action: DeviceActions.SelectedDeviceUpdateLocalFail) => {
          const deviceResponse = (action.payload as any).deviceResponse
            .unitId;
          this.store.dispatch(
            new DeviceActions.SetLoader({
              unitId: deviceResponse,
              isSettingLoderWorks: false,
            })
          );
          this.deviceListsubscriptionService.removeDevice(deviceResponse);

          this.errorHandler.showError('Fail to update device', action.payload);
          setTimeout(() => {
            this.translateService
              .get('label.list.no.update')
              .subscribe((label: string) => {
                this.toastService.errorToast(label);
              })
              .unsubscribe();
          }, 300);
          this.store.dispatch(new DeviceActions.SelectedDeviceReset());
        })
      ),
    { dispatch: false }
  );

  updateDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.SELECTED_DEVICE_UPDATE),
      switchMap((action: DeviceActions.SelectedDeviceUpdate) =>
        toAction(
          this.deviceDataService.updateDevice(
            action.payload
           // action.payload.isUpdateUnitId
          ),
          DeviceActions.SelectedDeviceUpdateSuccess,
          DeviceActions.SelectedDeviceUpdateFail
        )
      )
    )
  );

  selectedDeviceUpdateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DeviceActions.SELECTED_DEVICE_UPDATE_SUCCESS),
        tap((action: DeviceActions.SelectedDeviceUpdateSuccess) => {
          this.store.dispatch(new DeviceActions.DeviceListUpdateSuccess());
          this.translateService
            .get('label.list.local.orchestra.update')
            .subscribe((label: string) => {
              this.toastService.successToast(label);
            })
            .unsubscribe();
        })
      ),
    { dispatch: false }
  );

  selectedDeviceUpdateFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DeviceActions.SELECTED_DEVICE_UPDATE_FAIL),
        tap((action: DeviceActions.SelectedDeviceUpdateFail) => {
          this.errorHandler.showError('Fail to update device', action.payload);


          const deviceResponse = (action.payload as any).deviceResponse
            .unitId;
          this.store.dispatch(
            new DeviceActions.SetLoader({
              unitId: deviceResponse,
              isSettingLoderWorks: false,
            })
          );
          this.deviceListsubscriptionService.removeDevice(deviceResponse);

          setTimeout(() => {
            this.translateService
              .get('label.list.no.update')
              .subscribe((label: string) => {
                this.toastService.errorToast(label);
              })
              .unsubscribe();
          }, 300);
          this.store.dispatch(new DeviceActions.SelectedDeviceReset());
        })
      ),
    { dispatch: false }
  );
}
