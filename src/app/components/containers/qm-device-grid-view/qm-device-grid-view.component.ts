import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IBranchModel } from 'src/models/IBranch';
import { IDevice } from 'src/models/IDevice';
import { BranchSelectors, DeviceSelectors, UserSelectors } from 'src/store';

@Component({
  selector: 'app-qm-device-grid-view',
  templateUrl: './qm-device-grid-view.component.html',
  styleUrls: ['./qm-device-grid-view.component.scss'],
})
export class QmDeviceGridViewComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  userDirection$!: Observable<string>;
  public isRtl!: boolean;
  private subscriptions: Subscription = new Subscription();
  public deviceList$!: Observable<IDevice[]>;
  public selectedBranch$!: Observable<IBranchModel | null>;
  public responseObject: IDevice[] = [];
  public unitTypeObject: any = {};
  public selectedBranchName!: string;

  constructor(
    private userSelectors: UserSelectors,
    private deviceSelectors: DeviceSelectors,
    private branchSelectors: BranchSelectors,
    private router: Router
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.deviceList$ = this.deviceSelectors.deviceList$;
    this.selectedBranch$ = this.branchSelectors.selectedBranch$;
  }

  ngOnInit() {
    this.setRtlStyles();

    const branchSubscription = this.selectedBranch$.subscribe(
      (branch:any)=>{
        this.selectedBranchName = branch.name;
     //   console.log('b name',this.selectedBranchName);
      }
    );
    this.subscriptions.add(branchSubscription);

    const deviceSubscriptioncheck = this.deviceList$.subscribe(
      (devices: any) => {
        this.unitTypeObject = devices.filter(
          (device: any) => device.unitInfo != undefined
        );

        const sortedUnitTypeObject = [...this.unitTypeObject];

        sortedUnitTypeObject.sort((a, b) => {
          if (a.connected && !b.connected) {
            return -1;
          } else if (!a.connected && b.connected) {
            return 1;
          } else {
            return a.unitName.localeCompare(b.unitName);
          }
        });

        this.responseObject = sortedUnitTypeObject;
      }
    );
    this.subscriptions.add(deviceSubscriptioncheck);
  }

  //this.reponseObject.unitInfo.deviceInfo.connectedDevces

  getUnitName(unitName: any) {
    return unitName.substring(4);
  }

  getDeviceImage(unitType: any): any {
    if (unitType === 'ENTRY_POINT') {
      return 'images/QmaticKiosk.png';
    } else if (unitType === 'DISPLAY_POINT') {
      return 'images/QmaticDisplay.png';
    }
  }

  getDeviceDescription(connected: any, unitInfo: any, lastUpdateTime: any) {
    if (connected == false) {
      if (unitInfo == undefined) {
        return 'device.not.configured.grid.view';
      } else {
        const date = new Date(lastUpdateTime);
        return 'Last Updated Time : ' + date.toLocaleString();
      }
    } else {
      const date = new Date(lastUpdateTime);
      return 'Last Updated Time : ' + date.toLocaleString();
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
}
