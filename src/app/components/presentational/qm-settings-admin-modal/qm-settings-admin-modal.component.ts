import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { IDevice } from 'src/models/IDevice';
import { FormChangesService } from 'src/services/form-changes-service.service';
import {
  DeviceDataService,
  DeviceDispatchers,
  DeviceSelectors,
  UserSelectors,
} from 'src/store';
import { IAppState } from '../../../../store/reducers';
import { SettingsAutomaticUpgradeComponent } from './settings-automatic-upgrade/settings-automatic-upgrade.component';
import { SettingsCacheComponent } from './settings-cache/settings-cache.component';
import { BreakPoint } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import { SettingsDeviceComponent } from './settings-device/settings-device.component';
import { SettingsLogsComponent } from './settings-logs/settings-logs.component';
import { SettingsPinComponent } from './settings-pin/settings-pin.component';
import { SettingsUnitInfoComponent } from './settings-unit-info/settings-unit-info.component';

@Component({
  selector: 'app-qm-settings-admin-modal',
  templateUrl: './qm-settings-admin-modal.component.html',
  styleUrls: ['./qm-settings-admin-modal.component.scss'],
})
export class QmSettingsAdminModalComponent implements OnInit {
  @Input() unitId: any;
  public isUpdating?: boolean;
  public devicelistUpdateLoading$!: Observable<boolean>;
  private subscriptions: Subscription = new Subscription();
  public userDirection$!: Observable<string>;
  public isRtl!: boolean;
  public pageUpdateLoader: boolean = false;
  public size = '60%';
  public selectedDevice$!: Observable<IDevice | null>;
  public selectedDevice!: IDevice | null;
  public isDisable!: boolean;
  public isFormChanged!: boolean;
  public selectedComponent: any;

  constructor(
    private store: Store<IAppState>,
    public activeModal: NgbActiveModal,
    private router: Router,
    private deviceSelectors: DeviceSelectors,
    private userSelectors: UserSelectors,
    private deviceDataService: DeviceDataService,
    private formChangesService: FormChangesService,
    private translateService: TranslateService,
    private deviceDispatchers: DeviceDispatchers,
    //private observer: BreakpointObserver
  ) {
    this.devicelistUpdateLoading$ = this.deviceSelectors.listUpdateLoading$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.selectedDevice$ = this.deviceSelectors.selectedDevice$;
  }

  // ngAfterViewInit(){
  //   this.observer.observe(['(max-width:1200px)']).subscribe((res)=>{
  //     if(res.matches){
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close();
  //     }
  //     else{
  //       this.sidenav.mode = 'side';
  //       this.sidenav.open();
  //     }
  //   });
  // }
  get valueToReceive() {
    return this.deviceDataService.valueToPass;
  }

  ngOnInit() {
    const deviceSubscription = this.selectedDevice$.subscribe((data) => {
      this.selectedDevice = data;
    });

    this.selectedComponent = SettingsDeviceComponent;
    this.subscriptions.add(deviceSubscription);
    this.loadData(this.selectedDevice);
    this.setRtlStyles();
  }

  settingsClicked(component: any) {
    if (component == 'settings') {
      this.selectedComponent = SettingsDeviceComponent;
    } else if (component == 'pin') {
      this.selectedComponent = SettingsPinComponent;
    } else if (component == 'automaticupgrade') {
      this.selectedComponent = SettingsAutomaticUpgradeComponent;
    } else if (component == 'logs') {
      this.selectedComponent = SettingsLogsComponent;
    } else if (component == 'cache') {
      this.selectedComponent = SettingsCacheComponent;
    } else if (component == 'unitinfo') {
      this.selectedComponent = SettingsUnitInfoComponent;
    }
  }

  loadData(deviceInfo: any) {
    if (deviceInfo.unitInfo == null || deviceInfo.unitInfo == '') {
      this.isDisable = true;
    }
  }

  setRtlStyles() {
    const userDirectionSubscription = this.userDirection$.subscribe((data) => {
      if (data === 'rtl') {
        this.isRtl = true;
      } else {
        this.isRtl = false;
      }
    });

    this.subscriptions.add(userDirectionSubscription);
  }
  close() {
    this.deviceDispatchers.resetDeviceLogs();
    this.isFormChanged = this.formChangesService.getFormChanged();
    if (!this.isFormChanged) {
      this.activeModal.close();
      this.router.navigate(['/']);
      this.deviceDispatchers.selectedDeviceReset();
    } else {
      this.translateService
        .get('label.confirm.close.modal')
        .subscribe((label: string) => {
          if (confirm(label)) {
            this.activeModal.close();
            this.router.navigate(['/']);
            this.formChangesService.setFormChanged(false);
          }
        })
        .unsubscribe();
      this.deviceDispatchers.selectedDeviceReset();
    }
  }
}
