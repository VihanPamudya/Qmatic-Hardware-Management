import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IDevice } from 'src/models/IDevice';

import { DeviceSelectors } from 'src/store';

@Component({
  selector: 'app-settings-unit-info',
  templateUrl: './settings-unit-info.component.html',
  styleUrls: ['./settings-unit-info.component.scss'],
})
export class SettingsUnitInfoComponent implements OnInit {
  public androidVersion:any;
  public modelCode:any;
  public modelName:any;
  public softwareVersion:any;
  public deviceInfoList: any;
  public deviceModelCode!: string;
  public deviceDUID!: string;
  public deviceModel!: string;
  public deviceFirmwareVersion!: string;
  public deviceRealModel!: string;
  public deviceVersion!: string;
  public deviceIP!: string;
  public deviceMAC!: string;
  public networkMode!:string;
  public userAgent!: string;
  public deviceList$!: Observable<IDevice[]>;
  private subscriptions: Subscription = new Subscription();
  public selectedDevice$!: Observable<IDevice | null>;
  public selectedDevice!: IDevice | null;

  constructor(private deviceSelectors: DeviceSelectors) {
    this.deviceList$ = this.deviceSelectors.deviceList$;
    this.selectedDevice$ = this.deviceSelectors.selectedDevice$;
  }

  ngOnInit() {
    const deviceSubscription = this.selectedDevice$.subscribe((data) => {
      this.selectedDevice = data;
    });

    this.subscriptions.add(deviceSubscription);

    this.loadData(this.selectedDevice);
  }

  loadData(deviceInfo: any) {
    if (deviceInfo.unitInfo == null || deviceInfo.unitInfo == '') {
      console.log('There is no Unit information!');
    } else {
      this.deviceInfoList = deviceInfo;
      
      this.androidVersion =this.deviceInfoList?.unitInfo?.deviceInfo?.androidVersion;
      this.modelCode = this.deviceInfoList?.unitInfo?.deviceInfo.modelCode;
      this.modelName = this.deviceInfoList?.unitInfo?.deviceInfo.modelName;
      this.softwareVersion = this.deviceInfoList?.unitInfo?.deviceInfo.softwareVersion;
      this.deviceModelCode =this.deviceInfoList?.unitInfo.deviceInfo.deviceModelCode;
      this.deviceRealModel =this.deviceInfoList?.unitInfo.deviceInfo.deviceRealModel;
      this.deviceDUID = this.deviceInfoList?.unitInfo.deviceInfo.deviceDUID;
      this.deviceModel = this.deviceInfoList?.unitInfo.deviceInfo.deviceModel;
      this.deviceVersion = this.deviceInfoList?.unitInfo.deviceInfo.deviceVersion;
      this.deviceFirmwareVersion =this.deviceInfoList?.unitInfo.deviceInfo.deviceFirmwareVersion;
      this.userAgent = this.deviceInfoList?.unitInfo.deviceInfo.userAgent;

      this.deviceMAC = this.deviceInfoList?.unitInfo.networkInfo.deviceMAC;
      this.deviceIP = this.deviceInfoList?.unitInfo.networkInfo.deviceIP;
      this.networkMode = this.deviceInfoList?.unitInfo.networkInfo.networkMode;
    }
  }
}
