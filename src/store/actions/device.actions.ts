import { Action } from '@ngrx/store';
import { IDevice } from 'src/models/IDevice';

export const GET_DEVICE_LIST                     = '[Device] GET_DEVICE_LIST';
export const GET_CONNECTED_DEVICE_LIST           = '[Device] GET_CONNECTED_DEVICE_LIST';
export const GET_DEVICE_LIST_UPDATE              = '[Device] GET_DEVICE_LIST_UPDATE';
export const GET_DEVICE_BY_ID                    = '[Device] GET_DEVICE_BY_ID';
export const GET_DEVICE_BY_ID_FAIL               = '[Device] GET_DEVICE_BY_ID_FAIL';
export const GET_DEVICE_BY_ID_SUCCESS            = '[Device] GET_DEVICE_BY_ID_SUCCESS';
export const RESET_DEVICES_LIST                  = '[Device] RESET_DEVICES_LIST';
export const SELECTED_DEVICE                     = '[Device] SELECTED_DEVICE';
export const SELECTED_DEVICE_UPDATE              = '[Device] SELECTED_DEVICE_UPDATE';
export const SELECTED_DEVICE_UPDATE_LOCAL        = '[Device] SELECTED_DEVICE_UPDATE_LOCAL';
export const SELECTED_DEVICE_UPDATE_SUCCESS      = '[Device] SELECTED_DEVICE_UPDATE_SUCCESS';
export const SELECTED_DEVICE_UPDATE_LOCAL_SUCCESS= '[Device] SELECTED_DEVICE_UPDATE_LOCAL_SUCCESS';
export const SELECTED_DEVICE_UPDATE_FAIL         = '[Device] SELECTED_DEVICE_UPDATE_FAIL';
export const SELECTED_DEVICE_UPDATE_LOCAL_FAIL   = '[Device] SELECTED_DEVICE_UPDATE_LOCAL_FAIL';
export const DEVICES_LIST_UPDATE                 = '[Device] DEVICES_LIST_UPDATE';
export const DEVICES_LIST_UPDATE_SUCCESS         = '[Device] DEVICES_LIST_UPDATE_SUCCESS';
export const DEVICES_LIST_UPDATE_FAIL            = '[Device] DEVICES_LIST_UPDATE_FAIL';
export const SELECTED_DEVICE_RESET               = '[Device] SELECTED_DEVICE_RESET';
export const EDITED_SELECTED_DEVICE              = '[Device] EDITED_SELECTED_DEVICE';
export const SET_LOADER                          = '[Device] SET_LOADER';
export const UNIT_ID_CHANGE                      = '[Device] UNIT_ID_CHANGE';
export const EDITED_SELECTED_LOGS = '[Device] EDITED_SELECTED_LOGS';
export const EDITED_SELECTED_POINT = '[Device] EDITED_SELECTED_POINT';
export const SET_LOADER_DEVICE_LOGS = '[Device] SET_LOADER_DEVICE_LOGS';
export const GET_CONNECTED_DEVICES = '[Device] GET_CONNECTED_DEVICES';
export const GET_DEVICE_LOGS = '[Device] GET_DEVICE_LOGS';
export const RESET_DEVICES_LOGS = '[Device] RESET_DEVICES_LOGS';


export class GetDeviceList implements Action {
  readonly type = GET_DEVICE_LIST;
  constructor(public payload: IDevice[] ) {}
}
export class GetConnectedDeviceList implements Action {
  readonly type = GET_CONNECTED_DEVICE_LIST;
  constructor(public payload: IDevice[] ) {}
}
export class GetDeviceListUpdate implements Action {
  readonly type = GET_DEVICE_LIST_UPDATE;
  constructor(public payload: IDevice[]) {}
}
export class GetDeviceById implements Action {
  readonly type = GET_DEVICE_BY_ID;
  constructor(public payload: any) {}
}

export class GetDeviceByIdFail implements Action {
  readonly type = GET_DEVICE_BY_ID_FAIL;
  constructor(public payload: Object) {}
}

export class GetDeviceByIdSuccess implements Action {
  readonly type = GET_DEVICE_BY_ID_SUCCESS;
  constructor(public payload: any) {}
}

export class ResetDeviceList implements Action {
  readonly type = RESET_DEVICES_LIST;
  constructor() {}
}

export class SelectedDevice implements Action {
  readonly type = SELECTED_DEVICE;
  constructor(public payload: IDevice) {}
}

export class SelectedDeviceUpdate implements Action {
  readonly type = SELECTED_DEVICE_UPDATE;
  constructor(public payload: IDevice) {}
}


export class SelectedDeviceUpdateLocal implements Action {
  readonly type = SELECTED_DEVICE_UPDATE_LOCAL;
  constructor(public payload: IDevice) {}
}

export class SelectedDeviceUpdateSuccess implements Action {
  readonly type = SELECTED_DEVICE_UPDATE_SUCCESS;
  constructor(public payload: object) {}
}

export class SelectedDeviceUpdateLocalSuccess implements Action {
  readonly type = SELECTED_DEVICE_UPDATE_LOCAL_SUCCESS;
  constructor(public payload: object) {}
}

export class SelectedDeviceUpdateFail implements Action {
  readonly type = SELECTED_DEVICE_UPDATE_FAIL;
  constructor(public payload: Object) {}
}

export class SelectedDeviceUpdateLocalFail implements Action {
  readonly type = SELECTED_DEVICE_UPDATE_LOCAL_FAIL;
  constructor(public payload: Object) {}
}

export class DeviceListUpdate implements Action {
  readonly type = DEVICES_LIST_UPDATE;
  constructor(public payload: IDevice) {}
}

export class DeviceListUpdateSuccess implements Action {
  readonly type = DEVICES_LIST_UPDATE_SUCCESS;
  constructor() {}
}

export class DeviceListUpdateFail implements Action {
  readonly type = DEVICES_LIST_UPDATE_FAIL;
  constructor(public payload: Object) {}
}

export class SelectedDeviceReset implements Action {
  readonly type = SELECTED_DEVICE_RESET;
}

export class EditedSelectedDevice implements Action {
  readonly type = EDITED_SELECTED_DEVICE;
  constructor(public payload: IDevice) {}
}

export class EditedSelectedLogs implements Action {
  readonly type = EDITED_SELECTED_LOGS;
  constructor(public payload: any) {}
}

export class EditedSelectedPoint implements Action {
  readonly type = EDITED_SELECTED_POINT;
  constructor(public payload: any) {}
}

export class SetLoader implements Action {
  readonly type = SET_LOADER;
  constructor(public payload: { unitId: any; isSettingLoderWorks: boolean }) {}
}


export class SetLoaderDeviceLogs implements Action {
  readonly type = SET_LOADER_DEVICE_LOGS;
  constructor(public payload: { unitId: any; isSettingLoderWorks: boolean }) {}
}

export class UnitIdChange implements Action {
  readonly type = UNIT_ID_CHANGE;
  constructor(public payload: { unitId: any; }) {}
}

export class GetDeviceLogs implements Action {
  readonly type = GET_DEVICE_LOGS;
  constructor(public payload: any) {}
}

export class ResetDeviceLogs implements Action {
  readonly type = RESET_DEVICES_LOGS;
  constructor() {}
}

export class GetConnectedDevices implements Action {
  readonly type = GET_CONNECTED_DEVICES;
  constructor(public payload: any) {}
}



export type AllDeviceActions =
  | GetConnectedDeviceList
  | GetDeviceList
  | GetDeviceListUpdate
  | GetDeviceById
  | GetDeviceByIdFail
  | GetDeviceByIdSuccess
  | ResetDeviceList
  | SelectedDevice
  | SelectedDeviceUpdate
  | SelectedDeviceUpdateLocal
  | SelectedDeviceUpdateSuccess
  | SelectedDeviceUpdateLocalSuccess
  | SelectedDeviceUpdateFail
  | SelectedDeviceUpdateLocalFail
  | DeviceListUpdate
  | DeviceListUpdateSuccess
  | DeviceListUpdateFail
  | SelectedDeviceReset
  | EditedSelectedDevice
  | SetLoader
  | UnitIdChange
  | GetDeviceLogs
  | GetConnectedDevices
  | ResetDeviceLogs
  | SetLoaderDeviceLogs
  | EditedSelectedLogs
  | EditedSelectedPoint;
