import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import * as DeviceActions from '../../actions';
import { IDevice } from 'src/models/IDevice';

@Injectable()
export class DeviceDispatchers {
  constructor(private store: Store<IAppState>) {}

  getDeviceList(devices:any){
    this.store.dispatch(new DeviceActions.GetDeviceList(devices));
  }

  getConnectedDeviceList(devices:any){
    this.store.dispatch(new DeviceActions.GetConnectedDeviceList(devices));
  }

  getDeviceListUpdate(newDevices:any){
    this.store.dispatch(new DeviceActions.GetDeviceListUpdate(newDevices));
  }
  // getDeviceById(unitId: any) {
  //   this.store.dispatch(new DeviceActions.GetDeviceById({ unitId: unitId }));

  getDeviceById(processedEvent: any) {
    this.store.dispatch(new DeviceActions.GetDeviceByIdSuccess({ processedEvent : processedEvent}));
  }

  getDeviceLogs(processedEvent: any) {
    this.store.dispatch(new DeviceActions.GetDeviceLogs({ processedEvent : processedEvent}))
  }

  getConnectedDevices(processedEvent: any) {
    this.store.dispatch(new DeviceActions.GetConnectedDevices(processedEvent))
  }

  resetDeviceList() {
    this.store.dispatch(new DeviceActions.ResetDeviceList());
  }

  resetDeviceLogs() {
    this.store.dispatch(new DeviceActions.ResetDeviceLogs());
  }

  selectedDevice(device: IDevice) {
    this.store.dispatch(new DeviceActions.SelectedDevice(device));
  }

  selectedDeviceReset() {
    this.store.dispatch(new DeviceActions.SelectedDeviceReset());
  }

  editedselectedDevice(device: IDevice) {
    this.store.dispatch(new DeviceActions.EditedSelectedDevice(device));
  }

  editselectedLogs(device: any){
    this.store.dispatch(new DeviceActions.EditedSelectedLogs(device));
  }

  editselectedPoint(device: any){
    this.store.dispatch(new DeviceActions.EditedSelectedPoint(device));
  }

  selectedDeviceUpdate(device: IDevice) {
    this.store.dispatch(new DeviceActions.SelectedDeviceUpdate(device));
  }

  selectedDeviceUpdateLocal(device: IDevice) {
    this.store.dispatch(new DeviceActions.SelectedDeviceUpdateLocal(device));
  }

  setLoader(unitId: string, isSettingLoderWorks: boolean) {
    this.store.dispatch(
      new DeviceActions.SetLoader({
        unitId: unitId,
        isSettingLoderWorks: isSettingLoderWorks,
      })
    );
  }

  unitIdChange(unitId: any)
  {this.store.dispatch(new DeviceActions.UnitIdChange(unitId))};

  setLoaderDeviceLogs(unitId: string, isSettingLoderWorks: boolean){
    this.store.dispatch(
      new DeviceActions.SetLoaderDeviceLogs({
        unitId: unitId,
        isSettingLoderWorks: isSettingLoderWorks,
      })
    );
  }

}
