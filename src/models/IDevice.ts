export interface IDevice {
  id?: any;
  unitType?: string;
  pin?: number;
  isLoader?: boolean;
  isUpdateUnitId?:boolean;
  newUnitId?:string;
  isLoaderDeviceLogs?: boolean;
  isDisplayPoint?: boolean;
  isExpanded?: boolean;
  connected?: any;
  lastUpdateTime?: any;
  unitId?: string;
  unitName?: string;
  deviceId?: string;
  unitInfo?: {
    deviceInfo?: {
      androidVersion?:string;
      modelCode?:string;
      modelName?:string;
      softwareVersion?:string;
      deviceRealModel?: string;
      deviceDUID?: string;
      deviceFirmwareVersion?: string;
      connectedDevices?: any;
      deviceModel?: string;
      deviceModelCode?: string;
      userAgent: string;
      deviceVersion: string;

    };

    networkInfo?: {
      deviceIP: string;
      deviceMAC: string;
      networkMode: string;
    };

    appInfo?: {
      upgradeStatus?: string;
      appVersion?: string;
      cacheSize?: number;
      logLevel?: string;
      upgradeTime?: string;
      appName?: string;
      systemType?: string;
      unitId?: string;
      ipAddress?: string;
      host?: any;
      wsPort?: string;
      port?: string;
      noOfFiles?: number;
      origin?: string;
      isSSL?: boolean;
      serverIp?: string;
    };
  };
}
