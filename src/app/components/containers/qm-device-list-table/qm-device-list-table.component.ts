import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { IBranchModel } from 'src/models/IBranch';
import { IUnit } from 'src/models/IUnit';
import { ToastService } from 'src/services/util/toast.service';
import { IDevice } from '../../../../models/IDevice';
import {
  BranchDispatchers,
  BranchSelectors,
  DeviceDataService,
  DeviceDispatchers,
  DeviceSelectors,
  UnitSelectors,
  UserSelectors,
} from '../../../../store';
import { QmSettingsAdminModalComponent } from '../../presentational/qm-settings-admin-modal/qm-settings-admin-modal.component';

@Component({
  selector: 'app-qm-device-list-table',
  templateUrl: './qm-device-list-table.component.html',
  styleUrls: ['./qm-device-list-table.component.scss'],
})
export class QmDeviceListTableComponent implements OnInit, OnDestroy {
  @Input() radioValue = '';
  @Input() id: number = 0;
  @Input() handleButtonClick!: number;
  @Output() isAllFeildsDisabled: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  displayedColumns: string[] = [
    'unitName',
    'deviceIP',
    'appVersion',
    'updateTime',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  sortedData!: MatTableDataSource<any>;
  fullAppDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer') drawer!: MatDrawer;

  private modalRef!: NgbModalRef;
  public dashboardRowCSSHeight = '100%';
  private dashboardHeight = 600;
  private dashboardRemains = 88;
  private subscriptions: Subscription = new Subscription();
  public deviceList$!: Observable<IDevice[]>;
  public updatedDeviceList$!: Observable<IDevice[]>;
  public selectedBranch$: any;
  public unitList$!: Observable<IUnit[]>;
  public sortedfulldeviceList!: IDevice[];
  public fulDeviceList: IDevice[] = [];
  public displayPoints: IDevice[] = [];
  public userDirection$!: Observable<string>;
  public isRtl!: boolean;
  public expandedElement!: any;
  public unitType: any;
  public unitTypeObject: any = {};
  public responseObject: IDevice[] = [];
  public deviceSubscription: Subscription | null = null;
  public branchSubscription: Subscription | null = null;
  public isUpdating?: boolean;
  public devicelistUpdateLoading$!: Observable<boolean>;
  public selectedBranch!: IBranchModel;

  constructor(
    private unitSelectors: UnitSelectors,
    private userSelectors: UserSelectors,
    private deviceSelectors: DeviceSelectors,
    private branchSelectors: BranchSelectors,
    private translateService: TranslateService,
    public _MatPaginatorIntl: MatPaginatorIntl,
    private modalService: NgbModal,
    private deviceDispatchers: DeviceDispatchers,
    private branchDispatcher: BranchDispatchers,
    private toastService: ToastService,
    private deviceDataService: DeviceDataService,
    private router: Router
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.unitList$ = this.unitSelectors.unitList$;
    this.deviceList$ = this.deviceSelectors.deviceList$;
    this.selectedBranch$ = this.branchSelectors.selectedBranch$;
    this.updatedDeviceList$ = this.deviceSelectors.updatedDeviceList$;
    this.devicelistUpdateLoading$ = this.deviceSelectors.listUpdateLoading$;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @ViewChild('myDiv')
  theDiv!: ElementRef;

  ngAfterContentChecked() {
    let elem: HTMLElement | null;
    elem = document.getElementById('dashboard-body');
    if (elem !== null) {
      let elemHight = elem.clientHeight;
      if (
        elemHight !== this.dashboardHeight &&
        elemHight > this.dashboardRemains
      ) {
        this.dashboardHeight = elemHight;
        this.dashboardRowCSSHeight =
          elemHight - this.dashboardRemains - 23 + 'px';
      }
    }
  }

  get valueToReceive() {
    return this.deviceDataService.valueToPass;
  }

  ngOnInit() {
    document.title = 'Qmatic Hardware Management';

    const deviceSubscription = this.devicelistUpdateLoading$.subscribe(
      (data) => {
        this.isUpdating = data;
      }
    );
    this.subscriptions.add(deviceSubscription);

    const deviceSubscriptioncheck1 = this.deviceList$.subscribe((data) => {
      if (this.valueToReceive == true) {
        if (this.drawer != undefined) {
          if (this.drawer.opened) {
            this.drawer.toggle();
          }
        }

        this.unitTypeObject = data.filter(
          (device) => device.unitType === 'DISPLAY_POINT'
        );
      } else {
        if (this.drawer != undefined) {
          if (this.drawer.opened) {
            this.drawer.toggle();
          }
        }
        this.unitTypeObject = data.filter(
          (device) => device.unitType === 'ENTRY_POINT'
        );
      }

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
      console.log('table =',sortedUnitTypeObject);
      this.dataSource = new MatTableDataSource(sortedUnitTypeObject);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.subscriptions.add(deviceSubscriptioncheck1);

    this.setRtlStyles();

    this.translateService
      .get('items.per.page')
      .subscribe((label: string) => {
        this._MatPaginatorIntl.itemsPerPageLabel = label;
      })
      .unsubscribe();
    this.translateService
      .get('next.page.label')
      .subscribe((label: string) => {
        this._MatPaginatorIntl.nextPageLabel = label;
      })
      .unsubscribe();
    this.translateService
      .get('previous.page.label')
      .subscribe((label: string) => {
        this._MatPaginatorIntl.previousPageLabel = label;
      })
      .unsubscribe();
    this.translateService
      .get('first.page.Label')
      .subscribe((label: string) => {
        this._MatPaginatorIntl.firstPageLabel = label;
      })
      .unsubscribe();
    this.translateService
      .get('last.page.label')
      .subscribe((label: string) => {
        this._MatPaginatorIntl.lastPageLabel = label;
      })
      .unsubscribe();
    this._MatPaginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
  }

  close() {
    this.drawer.toggle();
    this.expandedElement = null;
  }

  click(row: any) {
    if (row.unitInfo.deviceInfo.connectedDevices.length > 0) {
      if (this.expandedElement === row && this.drawer.opened) {
        this.drawer.toggle();
        this.expandedElement = null;
      } else {
        if (this.drawer.opened) {
          this.drawer.toggle();
        }
        this.expandedElement = row;
        this.drawer.toggle();
      }
    }
  }

  checkDisable(row: any) {
    return row.unitInfo?.deviceInfo?.connectedDevices ? false : true;
  }

  formatDate(dateString: string): string {
    if (dateString == undefined) {
      return '';
    } else {
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  }

  connectedDevicesLength(connectedDevicesLength: any) {
    if (connectedDevicesLength == null) {
      return '-';
    } else {
      return connectedDevicesLength.length;
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

  sortData(sort: Sort) {
    console.log('sort:', sort);

    const data = this.dataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.responseObject.slice();
      return;
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'unitName':
          return this.compare(a.unitName, b.unitName, isAsc);
        case 'deviceIP':
          return this.compare(a.deviceIP, b.deviceIP, isAsc);
        case 'appVersion':
          return this.compare(a.appVersion, b.appVersion, isAsc);
        case 'updateTime':
          return this.compare(a.updateTime, b.updateTime, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource.data = sortedData;
  }

  compare(
    a: string | number | Date,
    b: string | number | Date,
    isAsc: boolean
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private getRangeLabel(
    page: number,
    pageSize: number,
    length: number
  ): string {
    if (length === 0 || pageSize === 0) {
      var rangeLabel = '';
      this.translateService
        .get('range.page.label.from.zero', {
          length: length,
        })
        .subscribe((label: string) => {
          rangeLabel = label;
        })
        .unsubscribe();
      return rangeLabel;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;

    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    var rangeLabel = '';
    this.translateService
      .get('range.page.label.from.none.zero', {
        startIndex: startIndex + 1,
        endIndex: endIndex,
        length: length,
      })
      .subscribe((label: string) => {
        rangeLabel = label;
      })
      .unsubscribe();
    return rangeLabel;
  }

  openDeviceSettingModal(row: any, unitId: string) {
    this.deviceDataService.deviceID = unitId;
    this.deviceDispatchers.selectedDevice(row);
    if (this.drawer.opened) {
      this.drawer.toggle();
      this.expandedElement = null;
    }

    this.modalRef = this.modalService.open(QmSettingsAdminModalComponent, {
      centered: true,
      animation: false,
      ariaLabelledBy: 'modal-basic-title',
      modalDialogClass: 'short',
      backdrop: 'static',
    });
    this.modalRef.componentInstance.unitId = unitId;
  }
}
