import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { IBranchModel } from 'src/models/IBranch';
import { IUnit } from 'src/models/IUnit';
import { CometDService } from 'src/services/cometDataFunctions/comet-d.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { ToastService } from 'src/services/util/toast.service';
import {
  BranchDispatchers,
  BranchSelectors,
  DeviceDataService,
  DeviceDispatchers,
  UnitDispatchers,
  UnitSelectors,
  UserSelectors,
} from 'src/store';
import { QmDeviceListTableComponent } from '../qm-device-list-table/qm-device-list-table.component';

@Component({
  selector: 'app-qm-branch-list',
  templateUrl: './qm-branch-list.component.html',
  styleUrls: ['./qm-branch-list.component.scss'],
})
export class QmBranchListComponent implements OnInit, OnDestroy {
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newItemEvent1 = new EventEmitter<boolean>();
  @ViewChild(QmDeviceListTableComponent) child!: QmDeviceListTableComponent;
  public isRtl!: boolean;
  branchList$!: Observable<IBranchModel[]>;
  private subscriptions: Subscription = new Subscription();
  userDirection$!: Observable<string>;
  public unitList$!: Observable<IUnit[]>;
  public selectedBranch$!: any;
  public branchPrefix: any;
  public oldBranchPrefix: any;
  public unitSubscription: any;
  public branches: IBranchModel[] = [];
  public branchName!: string;
  public selectedBranch!: IBranchModel;

  constructor(
    private unitSelectors: UnitSelectors,
    private branchDispatcher: BranchDispatchers,
    private branchSelectors: BranchSelectors,
    private unitDispatchers: UnitDispatchers,
    private deviceDispatchers: DeviceDispatchers,
    private deviceDataService: DeviceDataService,
    private userSelectors: UserSelectors,
    private cometdService: CometDService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService
  ) {
    this.branchList$ = this.branchSelectors.branches$;
    this.selectedBranch$ = this.branchSelectors.selectedBranch$;
    this.unitList$ = this.unitSelectors.unitList$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAllbranches() {
    const branchSubscription = this.branchList$.subscribe((data) => {
      this.branches = data;
    });
    this.subscriptions.add(branchSubscription);
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

  ngOnInit() {
    this.branchDispatcher.fetchBranches();
    this.getAllbranches();

    const selectedBranchSubscription = this.selectedBranch$.subscribe(
      (data: any) => {
        this.selectedBranch = data;
      }
    );
    this.subscriptions.add(selectedBranchSubscription);
  }

  searchDevice() {
    this.cometdService.unsubscribe();
    let isUttAvailable = -1;
    this.unitDispatchers.fetchUnitList(this.selectedBranch.id);
    if (!this.unitSubscription && isUttAvailable == -1) {
      this.unitSubscription = this.unitList$.subscribe((units: IUnit[]) => {
        for (const unit of units) {
          if (unit) {
            isUttAvailable = 0;
            if (unit.unitId?.slice(4) == 'DeviceConfiguration') {
              isUttAvailable = 1;
              break;
            }
          }
        }

        if (isUttAvailable === 1) {
          const updatedDeviceArray = units
            .filter(
              (unit) =>
                (unit.unitType === 'DISPLAY_POINT' &&
                  unit.unitId?.slice(4) !== 'NotificationUnit' &&
                  unit.unitId?.slice(4) !== 'DeviceConfiguration') ||
                unit.unitType === 'ENTRY_POINT'
            )
            .map((unit) => ({
              unitId: unit.id,
              unitType: unit.unitType,
              unitName: unit.unitId,
              deviceId: undefined,
              unitInfo: undefined,
              connected: false,
              lastUpdateTime: undefined,
            }));

          if (units.length == 0) {
            this.branchPrefix = undefined;
          } else {
            this.branchPrefix = units[0].unitId?.slice(0, 3);
          }

          this.deviceDispatchers.getDeviceList(updatedDeviceArray);

          if (this.branchPrefix) {
            this.cometdService.initializeCometD(this.branchPrefix);
            this.oldBranchPrefix = this.branchPrefix

            return;
          }
        } else if (isUttAvailable == 0) {
          this.deviceDispatchers.resetDeviceList();
          this.translateService
            .get('label.list.no.utt')
            .subscribe((label: string) => {
              this.toastService.errorToast(label);
            })
            .unsubscribe();
          isUttAvailable = -1;
          return;
        }
      });
      this.subscriptions.add(this.unitSubscription);
    }

    this.branchDispatcher.selectedBranch(this.selectedBranch);
    this.newItemEvent.emit(this.selectedBranch.name);
    this.deviceDataService.branchName = this.selectedBranch.name;
    this.unitDispatchers.resetUnitList();
    this.deviceDispatchers.resetDeviceList();
  }

  branchClear() {
    if (!this.selectedBranch) {
      this.branchName = '';
      this.newItemEvent.emit(this.branchName);
      this.unitDispatchers.resetUnitList();
      this.deviceDispatchers.resetDeviceList();
      this.branchPrefix = undefined;
      this.oldBranchPrefix = undefined;
    }
  }
}
