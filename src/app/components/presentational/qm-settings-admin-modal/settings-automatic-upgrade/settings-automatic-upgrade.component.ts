import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DateTime } from 'luxon';
import { Observable, Subscription } from 'rxjs';
import { IDevice } from 'src/models/IDevice';
import { FormChangesService } from 'src/services/form-changes-service.service';
import { ToastService } from 'src/services/util/toast.service';
import {
  DeviceDataService,
  DeviceDispatchers,
  DeviceSelectors,
  UserSelectors,
} from 'src/store';

@Component({
  selector: 'app-settings-automatic-upgrade',
  templateUrl: './settings-automatic-upgrade.component.html',
  styleUrls: ['./settings-automatic-upgrade.component.scss'],
})
export class SettingsAutomaticUpgradeComponent implements OnInit {
  public deviceInfoList: any;
  public unitID: any;
  public inputForm: FormGroup;
  public defaultTimeValue: string = '00:00';
  public deviceList$!: Observable<IDevice[]>;
  public responseObject: IDevice[] = [];
  private subscriptions: Subscription = new Subscription();
  public selectedDevice$!: Observable<IDevice | null>;
  public selectedDevice!: IDevice | null;
  public userDirection$!: Observable<string>;
  public isRtl!: boolean;
  public data: boolean = true;
  public formChanges: boolean = false;
  public deviceSubscription: Subscription | null = null;
  public relevantId!: any;
  upgradeStatusList = [{ label: 'ENABLED' }, { label: 'DISABLED' }];

  constructor(
    private formBuilder: FormBuilder,
    private deviceSelectors: DeviceSelectors,
    private deviceDispatchers: DeviceDispatchers,
    private userSelectors: UserSelectors,
    private deviceDataService: DeviceDataService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private activeModal: NgbActiveModal,
    private formChangesService: FormChangesService
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.deviceList$ = this.deviceSelectors.deviceList$;
    this.selectedDevice$ = this.deviceSelectors.selectedDevice$;
    this.inputForm = this.formBuilder.group({
      ipAddress: ['', [Validators.maxLength(20), Validators.required]],
      upgradeStatus: ['', [Validators.maxLength(20), Validators.required]],
      upgradeTime: ['', [Validators.maxLength(20), Validators.required]],
    });
  }

  ngOnInit() {
    const deviceSubscription = this.selectedDevice$.subscribe((data) => {
      this.selectedDevice = data;
    });

    this.subscriptions.add(deviceSubscription);

    this.loadData(this.selectedDevice);

    this.inputForm.valueChanges.subscribe(() => {
      this.formChanges = true;
      this.formChangesService.setFormChanged(this.formChanges);
    });
    this.formChanges = false;

    this.setRtlStyles();
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

  loadData(deviceInfo: any) {
    console.log('check:', deviceInfo);
    if (
      deviceInfo.unitInfo == null ||
      deviceInfo.unitInfo == '' || deviceInfo.unitInfo == undefined || (!deviceInfo.unitInfo.appInfo.upgradeTime)
    ) {
      this.data = false;
    } else {
      this.deviceInfoList = deviceInfo;
      const upgradeTime = this.deviceInfoList.unitInfo.appInfo.upgradeTime;
      const formattedUpgradeTime = DateTime.fromFormat(
        upgradeTime,
        'HH'
      ).toFormat('hh:mm');
      this.inputForm.patchValue({
        upgradeStatus: this.deviceInfoList.unitInfo.appInfo.upgradeStatus,
        upgradeTime: formattedUpgradeTime,
      });
    }
  }

  onSubmit() {
    const formattedUpgradeTime = DateTime.fromFormat(
      this.inputForm.value.upgradeTime,
      'hh:mm'
    ).toFormat('HH');

    const UpgradeStatus = this.inputForm.value.upgradeStatus;
    const IpAddress = this.inputForm.value.ipAddress;

    const newAppInfo = {
      ...this.selectedDevice?.unitInfo?.appInfo,
      upgradeStatus: UpgradeStatus,
      upgradeTime: formattedUpgradeTime,
      ipAddress: IpAddress,
    };

    const newDisdplayInfo = {
      ...this.selectedDevice?.unitInfo,
      appInfo: newAppInfo,
    };
    const newResult = {
      ...this.selectedDevice,
      isLoader : true,
      unitInfo: newDisdplayInfo,
      isUpdateUnitId: false
    };
    this.selectedDevice = newResult;

    if (this.data) {
      if (this.selectedDevice.connected) {
        this.deviceDispatchers.selectedDeviceUpdate(this.selectedDevice);
        this.deviceDispatchers.editedselectedDevice(this.selectedDevice);

        this.relevantId = this.selectedDevice.unitId;
      } else {
        this.translateService
          .get('label.list.update.not.connected')
          .subscribe((label: string) => {
            this.toastService.errorToast(label);
          })
          .unsubscribe();
      }
    }
    this.activeModal.close();
  }

  clearInput(event: any) {
    this.inputForm.patchValue({
      [event.input_name]: '',
    });
  }

  getInputStatus(inputIndex: String) {
    return this.inputForm.controls[`${inputIndex}`].value ? true : false;
  }

  get ipAddress() {
    return this.inputForm.get('ipAddress') as FormControl;
  }

  get upgradeStatus() {
    return this.inputForm.get('upgradeStatus') as FormControl;
  }
  get upgradetime() {
    return this.inputForm.get('upgradeTime') as FormControl;
  }
}
