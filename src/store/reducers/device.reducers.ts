import { act } from '@ngrx/effects/src';
import { IDevice } from 'src/models/IDevice';
import * as DeviceActions from '../actions';
import { elementAt } from 'rxjs';
import { foregroundColorNames } from 'chalk';

export interface IDeviceState {
  devices: IDevice[];
  connectedDevices: IDevice[];
  device: IDevice | null;
  loading: any;
  updating: boolean;
  loaded: boolean;
  deviceLogs: any;
  error: Object | null;
}

export const initialState: IDeviceState = {
  devices: [],
  connectedDevices: [],
  device: null,
  loading: false,
  updating: false,
  loaded: false,
  deviceLogs: null,
  error: null,
};

export function reducer(
  state: IDeviceState = initialState,
  action: DeviceActions.AllDeviceActions
): IDeviceState {
  switch (action.type) {
    case DeviceActions.GET_DEVICE_LIST: {
      return {
        ...state,
        devices: action.payload,
        loading: true,
        error: null,
      };
    }
    case DeviceActions.GET_CONNECTED_DEVICE_LIST: {
      return {
        ...state,
        devices: updateListUsingConnectedDevices(state.devices, action.payload),
        loading: true,
        error: null,
      };
    }

    case DeviceActions.GET_DEVICE_LOGS: {
      return {
        ...state,
        deviceLogs: action.payload.processedEvent.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    }

    case DeviceActions.SELECTED_DEVICE: {
      return {
        ...state,
        device: action.payload,
        loading: true,
        error: null,
      };
    }
    case DeviceActions.SELECTED_DEVICE_UPDATE: {
      return {
        ...state,
        device: action.payload,
        devices: updateSelectedDevice(state.devices, action.payload),
        loading: true,
        error: null,
      };
    }
    case DeviceActions.SELECTED_DEVICE_UPDATE_LOCAL: {
      return {
        ...state,
        device: action.payload,
        updating: true,
        loading: true,
        error: null,
      };
    }
    case DeviceActions.SELECTED_DEVICE_UPDATE_SUCCESS: {
      return {
        ...state,
        loading: true,
        updating: false,
        error: action.payload,
      };
    }
    case DeviceActions.SELECTED_DEVICE_UPDATE_LOCAL_SUCCESS: {
      return {
        ...state,
        loading: true,
        updating: false,
        error: null,
      };
    }
    case DeviceActions.SELECTED_DEVICE_UPDATE_FAIL: {
      return {
        ...state,
        loading: false,
        updating: false,
        error: action.payload,
      };
    }
    case DeviceActions.SELECTED_DEVICE_UPDATE_LOCAL_FAIL: {
      return {
        ...state,
        loading: false,
        updating: false,
        error: action.payload,
      };
    }
    case DeviceActions.RESET_DEVICES_LIST: {
      return {
        ...state,
        devices: [],
        loading: false,
        loaded: true,
        error: null,
      };
    }

    case DeviceActions.RESET_DEVICES_LOGS: {
      return {
        ...state,
        deviceLogs: null,
        loading: false,
        loaded: true,
        error: null,
      };
    }
    case DeviceActions.DEVICES_LIST_UPDATE_SUCCESS: {
      const updatedDevice = state.device ? { ...state.device } : null;
      if (!updatedDevice || !updatedDevice) {
        return state;
      }
      const itemIndex = state.devices.findIndex(
        (device) => device.unitId === updatedDevice.unitId
      );
      const updatedDevices = [...state.devices];
      updatedDevices[itemIndex] = updatedDevice;
      return {
        ...state,
        devices: updatedDevices,
        error: null,
      };
    }

    case DeviceActions.SELECTED_DEVICE_RESET: {
      return {
        ...state,
        device: null,
      };
    }
    case DeviceActions.EDITED_SELECTED_DEVICE: {
      return {
        ...state,
        device: action.payload,
        devices: editDeviceList(state.devices, action.payload),
        error: null,
      };
    }

    case DeviceActions.EDITED_SELECTED_POINT: {
      return {
        ...state,
        device: action.payload,
        devices: editPointList(state.devices, action.payload),
        error: null,
      };
    }

    case DeviceActions.GET_CONNECTED_DEVICES: {
      return {
        ...state,
        devices: connectedList(state.devices, action.payload),
        loading: true,
        error: null,
      };
    }

    case DeviceActions.EDITED_SELECTED_LOGS: {
      return {
        ...state,
        devices: editLogsList(state.devices, action.payload),
        error: null,
      };
    }

    case DeviceActions.SET_LOADER: {
      return {
        ...state,
        devices: setLoadertodevice(state.devices, action.payload),
        error: null,
      };
    }

    case DeviceActions.SET_LOADER_DEVICE_LOGS: {
      return {
        ...state,
        devices: setLoadertoDeviceLogs(state.devices, action.payload),
        error: null,
      };
    }
    case DeviceActions.UNIT_ID_CHANGE: {
      return {
        ...state,
        devices: unitIdchangingDevice(state.devices, action.payload),
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}

function updateSelectedDevice(devices: IDevice[], deviceData: IDevice){
  devices = devices.map((device) => {
    if (device.newUnitId && device.isUpdateUnitId) {
      const result = {
        ...device,
        connected: false,
        newUnitId: undefined,
        unitInfo: undefined,
        isLoader: false
      };
      return result;
    }
    return device;
  });

  const updatedDevices = devices.map((device) => {
    if (device.unitId === deviceData.unitId) {
      const newresult = {
        ...device,
        isLoader: deviceData.isLoader,
      };
      device = newresult;
    }
    return device;
  });
  return updatedDevices;
}

function editDeviceList(devices: IDevice[], deviceData: IDevice) {
  const updatedDevices = devices.map((device) => {
    if (device.unitId === deviceData.unitId) {
      const newresult = {
        ...device,
        isLoader: deviceData.isLoader,
        isLoaderDeviceLogs: deviceData.isLoaderDeviceLogs,
        connected: deviceData.connected,
        lastUpdateTime: deviceData.lastUpdateTime,
        unitId: deviceData.unitId,
        unitName: deviceData.unitName,
        deviceId: deviceData.deviceId,
        unitInfo: deviceData.unitInfo,
        newUnitId: deviceData.newUnitId
      };
      return newresult;
      console.log('1',newresult);
    }
    else{
      return device;
    }
  });
  console.log('3',updatedDevices);
  return updatedDevices;
}

function editLogsList(devices: IDevice[], deviceData: any) {
  const updatedDevices = devices.map((device) => {
    if (device.unitId === deviceData.unitId) {
      const newresult = {
        ...device,
        isLoaderDeviceLogs: deviceData.isLoaderDeviceLogs,
      };
      device = newresult;
    }
    return device;
  });
  return updatedDevices;
}

function editPointList(devices: IDevice[], deviceData: any) {
  // console.log('deviceData', devices);
  // console.log('deviceData:', deviceData);

  const updatedDevices = devices.map((device) => {
    const newresult = {
      ...device,
      isDisplayPoint: deviceData,
    };
    device = newresult;

    return device;
  });
  return updatedDevices;
}

function setLoadertodevice(devices: IDevice[], loadData: any) {
  const updatedDevices = devices.map((device) => {
      if (device.unitId == loadData.unitId) {
        const newresult = { ...device, isLoader: loadData.isSettingLoderWorks };
        device = newresult;
      }
      return device;
  });
  return updatedDevices;
}

function setLoadertoDeviceLogs(devices: IDevice[], loadData: any) {
  const updatedDevices = devices.map((device) => {
    if (device.unitId == loadData.unitId && !loadData.isSettingLoderWorks) {
      const newresult = {
        ...device,
        isLoaderDeviceLogs: loadData.isSettingLoderWorks,
      };
      device = newresult;
    }
    return device;
  });
  return updatedDevices;
}

function unitIdchangingDevice(devices: IDevice[], loadData: any) {
  const updatedDevices = devices.map((device) => {
    if (device.unitId == loadData.unitId) {
      const newresult = {
        ...device,
        isLoader:false,
        unitInfo: undefined,
        connected: false,
        updateStatus: null,
      };
      device = newresult;
    }
    return device;
  });

  const sortedDevices = updatedDevices
    .sort((deviceA, deviceB) => {
      const unitNameA = deviceA.unitName || '';
      const unitNameB = deviceB.unitName || '';
      return unitNameA.localeCompare(unitNameB);
    })
    .filter((device) => device.connected == true)
    .concat(updatedDevices.filter((device) => device.connected != true));

  return sortedDevices;
}

function connectedList(devices: any, newDevices: any) {
  if (newDevices != null) {
    const updatedDevices = devices.map((device: any) => {
      const connectedDevice = newDevices.find(
        (d: any) => d.toString() === device.unitId.toString()
      );

      if (connectedDevice) {
        return {
          ...device,
          connected: true,
        };
      } else {
        return {
          ...device,
          connected: false,
        };
      }
    });
    return updatedDevices;
  } else {
    return devices;
  }
}

//update store with connected devices
function updateListUsingConnectedDevices(devices: any, newDevices: any) {
  if (newDevices != null && devices != null) {
    const updatedDevices = devices.map((device: any) => {
      const connectedDevice = newDevices.find(
        (d: any) => d.unitId == device.unitId
      );
      if (connectedDevice) {
        return {
          ...device,
          connected: connectedDevice.connected,
          lastUpdateTime: connectedDevice.lastUpdateTime,
          unitInfo: connectedDevice.unitInfo,
        };
      }
      return device;
    });
    return updatedDevices;
  } else {
    return devices;
  }
}
