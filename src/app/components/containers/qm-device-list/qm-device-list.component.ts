import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ToastService } from 'src/services/util/toast.service';
import { IDevice } from '../../../../models/IDevice';
import {
  BranchSelectors,
  DeviceDataService,
  DeviceDispatchers,
  DeviceSelectors,
  UserSelectors,
} from '../../../../store';
import { QmDeviceListTableComponent } from '../../containers/qm-device-list-table/qm-device-list-table.component';
import { IBranchModel } from 'src/models/IBranch';

@Component({
  selector: 'app-qm-device-list',
  templateUrl: './qm-device-list.component.html',
  styleUrls: ['./qm-device-list.component.scss'],
})
export class QmDeviceListComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;
  deviceListCom!: QmDeviceListTableComponent;
  private subscriptions: Subscription = new Subscription();
  public deviceList!: IDevice[];
  userDirection$!: Observable<string>;
  public selectedBranch!: IBranchModel;
  public isRtl!: boolean;
  public IsClear: boolean = false;
  public devicesLoading$!: Observable<boolean>;
  public valueToPass!: number;
  public isSelect: boolean = true;
  public selectedBranch$!: any;

  constructor(
    private toastService: ToastService,
    private deviceSelectors: DeviceSelectors,
    private deviceDataService: DeviceDataService,
    private userSelectors: UserSelectors,
    private deviceDispatchers: DeviceDispatchers,
    private branchSelectors: BranchSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.devicesLoading$ = this.deviceSelectors.devicesLoading$;
    this.selectedBranch$ = this.branchSelectors.selectedBranch$;
  }

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);
    this.setRtlStyles();

    const branchSubscription = this.selectedBranch$.subscribe((branch: any) => {
      this.selectedBranch = branch;
    });
    this.subscriptions.add(branchSubscription);
    this.isSelect = this.deviceDataService.valueToPass;
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

  // addItem(newItem: string) {
  //   this.selectedBranch = newItem;
  // }

  // addItem1(isClear: boolean) {
  //   if (!isClear) {
  //     this.IsClear = true;
  //   }
  // }

  handleButtonClick(value: boolean) {
    this.deviceDataService.valueToPass = value;
    this.isSelect = value;
    this.deviceDispatchers.editselectedPoint(value);
  }
}
