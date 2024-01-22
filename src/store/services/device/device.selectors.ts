import { Injectable } from '@angular/core';
import { IDeviceState } from 'src/store/reducers/device.reducers';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { IAppState } from 'src/store/reducers';
import { state } from '@angular/animations';

const getDeviceState = createFeatureSelector<IDeviceState>('device');

const getUpdatedDeviceList = createSelector(
  getDeviceState,
  (state:IDeviceState)=> state.devices
)
const getDeviceById = createSelector(
  getDeviceState,
  (state: IDeviceState) => state.devices
);

const getDevicesLoading = createSelector(
  getDeviceState,
  (state: IDeviceState) => state.loading
);

const getDevicesLoaded = createSelector(
  getDeviceState,
  (state: IDeviceState) => state.loaded
);

const selectedDevice = createSelector(
  getDeviceState,
  (state: IDeviceState) => state.device
)

const editedselectedDevice = createSelector(
  getDeviceState,
  (state: IDeviceState) => state.device
)

const selectedDeviceUpdate = createSelector(
  getDeviceState,
  (state: IDeviceState) => state.device
)

const listUpdateLoadung = createSelector(
  getDeviceState,
  (state: IDeviceState) => state.updating
)

const setLoader = createSelector(
  getDeviceState,
  (state: IDeviceState) => state.device
)

const getLogs = createSelector(
  getDeviceState,
  (state: IDeviceState) => state.deviceLogs
)



@Injectable()
export class DeviceSelectors {
  constructor(private store: Store<IAppState>) {}
  deviceList$ = this.store.select(getDeviceById);
  updatedDeviceList$ = this.store.select(getUpdatedDeviceList);
  
  devicesLoading$ = this.store.select(getDevicesLoading);
  devicesLoaded$ = this.store.select(getDevicesLoaded);
  selectedDevice$ = this.store.select(selectedDevice);
  selectedDeviceUpdate$ = this.store.select(selectedDeviceUpdate);
  listUpdateLoading$ = this.store.select(listUpdateLoadung);
  editedselectedDevice$ = this.store.select(editedselectedDevice);
  setLoader$ = this.store.select(setLoader);
  getLogs$ = this.store.select(getLogs)
}
