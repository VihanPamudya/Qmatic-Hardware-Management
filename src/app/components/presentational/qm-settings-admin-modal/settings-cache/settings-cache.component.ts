import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IDevice } from 'src/models/IDevice';
import { DeviceSelectors, UserSelectors } from 'src/store';

@Component({
  selector: 'app-settings-cache',
  templateUrl: './settings-cache.component.html',
  styleUrls: ['./settings-cache.component.scss'],
})
export class SettingsCacheComponent implements OnInit {
  progressbarValue!: any;
  cacheMemory!: any;
  filledmemory!: any;
  public deviceList$!: Observable<IDevice[]>;
  public responseObject: IDevice[] = [];
  private subscriptions: Subscription = new Subscription();
  public deviceInfoList: any;
  public cacheSize!: number;
  public noOfCacheFiles!: number;
  public selectedDevice$!: Observable<IDevice | null>;
  public selectedDevice!: IDevice | null;
  public userDirection$!: Observable<string>;
  public isRtl!: boolean;
  public checkDirection!: Direction;

  constructor(
    private deviceSelectors: DeviceSelectors,
    private userSelectors: UserSelectors
  ) {
    this.deviceList$ = this.deviceSelectors.deviceList$;
    this.selectedDevice$ = this.deviceSelectors.selectedDevice$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
    const deviceSubscription = this.selectedDevice$.subscribe((data) => {
      this.selectedDevice = data;
    });

    this.subscriptions.add(deviceSubscription);

    this.loadData(this.selectedDevice);

    this.setRtlStyles();
  }

  setRtlStyles() {
    const userDirectionSubscription = this.userDirection$.subscribe((data) => {
      if (data === 'rtl') {
        this.isRtl = true;
        this.checkDirection = 'rtl';
      } else {
        this.isRtl = false;
        this.checkDirection = 'ltr';
      }
    });

    this.subscriptions.add(userDirectionSubscription);
  }

  loadData(deviceInfo: any) {
    if (deviceInfo.unitInfo == null || deviceInfo.unitInfo == '') {
      console.log('There is no Cache!');
    } else {
      this.deviceInfoList = deviceInfo;
      this.cacheSize = this.deviceInfoList.unitInfo.appInfo.cacheSize;

      this.noOfCacheFiles = this.deviceInfoList.unitInfo.appInfo.noOfFiles;
      this.cacheSize = Math.round(this.cacheSize / 1000000);
      this.progressbar(this.cacheSize, 2048);
    }
  }

  progressbar(filled: any, cache: any) {
    this.progressbarValue = (filled * 100) / cache;

    this.cacheMemory = cache;
    this.filledmemory = filled;
  }

  clearCache() {
    this.filledmemory = 0;
    this.progressbar(this.filledmemory, this.cacheMemory);
  }
}
