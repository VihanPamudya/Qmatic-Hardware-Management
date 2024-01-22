import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { IDevice } from 'src/models/IDevice';
import { FormChangesService } from 'src/services/form-changes-service.service';
import { JsonpInterceptor } from '@angular/common/http';
import { DeviceListSubscriptionService } from 'src/services/cometDataFunctions/device-list-subscription.service';
import { ToastService } from 'src/services/util/toast.service';
import {
  DeviceDataService,
  DeviceDispatchers,
  DeviceSelectors,
} from 'src/store';

@Component({
  selector: 'app-settings-device',
  templateUrl: './settings-device.component.html',
  styleUrls: ['./settings-device.component.scss'],
})
export class SettingsDeviceComponent implements OnInit, OnDestroy {
  inputForm!: FormGroup;
  public deviceInfoList: any;
  public unitID: any;
  public deviceList$!: Observable<IDevice[]>;
  public selectedDevice$!: Observable<IDevice | null>;
  public disconnected: IDevice[] = [];
  public selectedDevice!: IDevice | null;
  private subscriptions: Subscription = new Subscription();
  public data: boolean = true;
  public isBrowserMode!: boolean;
  public relevantId!: any;
  public portLabelText: string = this.translateService.instant(
    'field.settingsUpdateForm.wsPort'
  );
  public errorPortLabelText: string = this.translateService.instant(
    'error.form.wsPort.required'
  );
  public Port!: string;
  public WsPort!: string;
  public deviceSubscription: Subscription | null = null;
  public formChanges: boolean = false;
  public currentId!: any;
  public isUpdateUnitId!: boolean;
  public serverIp: any;
  public checkServerIp!: boolean;
  public systems = [{ label: 'ORCHESTRA' }, { label: 'BROWSER_MODE' }];
  public SSLAvailability = [{ label: 'TRUE' }, { label: 'FALSE' }];
  public logLevels = [{ label: 'INFO' }, { label: 'WARN' }, { label: 'ERROR' }];
  public unitIDsArray: { id: string | undefined; label: string | undefined }[] = [];
  public updateDeviceArray: IDevice[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private deviceSelectors: DeviceSelectors,
    private deviceDispatchers: DeviceDispatchers,
    private activeModal: NgbActiveModal,
    private deviceDataService: DeviceDataService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private formChangesService: FormChangesService,
    private deviceListsubscriptionService : DeviceListSubscriptionService
  ) {
    this.deviceList$ = this.deviceSelectors.deviceList$;
    this.selectedDevice$ = this.deviceSelectors.selectedDevice$;

    this.inputForm = this.formBuilder.group({
      ipAddress: ['', [Validators.maxLength(15)]],
      host: ['', [Validators.maxLength(15)]],
      wsPort: ['', [Validators.maxLength(5)]],
      systemType: ['', [Validators.maxLength(20), Validators.required]],
      logLevel: ['', [Validators.maxLength(20), Validators.required]],
      unitId: ['', [Validators.maxLength(20), Validators.required]],
      branchPrefix: ['',[Validators.maxLength(3),Validators.minLength(3),Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      isSSL: ['', [Validators.maxLength(5)]],
      printerModel: ['', [Validators.maxLength(20)]],
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get valueToReceive() {
    return this.deviceDataService.valueToPass;
  }

  ngOnInit() {
    const deviceSubscription = this.selectedDevice$.subscribe((data) => {
      this.selectedDevice = data;
    });
    this.subscriptions.add(deviceSubscription);

    if (!this.selectedDevice?.unitInfo) {
      this.inputForm
        .get('ipAddress')
        ?.setValidators([
          Validators.required,
          Validators.pattern(
            /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
          ),
        ]);
      this.inputForm
        .get('host')
        ?.setValidators([Validators.required, Validators.maxLength(15)]);
      this.inputForm
        .get('wsPort')
        ?.setValidators([Validators.required, Validators.maxLength(5),Validators.pattern(/^[0-9]*$/)]);
    }
    else if(this.selectedDevice?.unitInfo && !this.valueToReceive){
      this.inputForm.get('isSSL')?.setValidators([Validators.required, Validators.maxLength(5)]);

      this.inputForm.get('ipAddress')?.clearValidators();
      this.inputForm.get('host')?.clearValidators();
      this.inputForm.get('wsPort')?.clearValidators();
      this.inputForm.get('systemType')?.clearValidators();
      this.inputForm.get('printerModel')?.clearValidators();
    }
    else {
      this.inputForm.get('ipAddress')?.clearValidators();
      this.inputForm.get('host')?.clearValidators();
      this.inputForm.get('wsPort')?.clearValidators();
      this.inputForm.get('printerModel')?.clearValidators();
      this.inputForm.get('isSSL')?.clearValidators();
    }
    this.inputForm.get('ipAddress')?.updateValueAndValidity();
    this.inputForm.get('host')?.updateValueAndValidity();
    this.inputForm.get('wsort')?.updateValueAndValidity();

    if (!this.data) {
      this.inputForm;
    }

    this.loadData(this.selectedDevice);

    const deviceListSubscription = this.deviceList$.subscribe(
      (devices: IDevice[]) => {
        if (this.valueToReceive == true) {
          devices = devices.filter(
            (device) => device.unitType === 'DISPLAY_POINT'
          );
        } else {
          devices = devices.filter(
            (device) => device.unitType === 'ENTRY_POINT'
          );
        }

        this.disconnected = devices.filter(
          (res: any) => res.connected == false
        ) as IDevice[];

        this.unitIDsArray = [];

        if (this.selectedDevice?.unitInfo) {
          this.disconnected.forEach((obj) => {
            const units = obj.unitName?.substring(4);
            const id = obj.unitId;
            const label = obj.unitName?.substring(4);
            this.unitIDsArray.push({ id: id, label: label });
          });

          let index = this.unitIDsArray.findIndex(
            (item) => item.label === this.selectedDevice?.unitName?.slice(4)
          );
          if (index < 0) {
            this.unitIDsArray.push({
              id: this.selectedDevice?.unitId,
              label: this.selectedDevice?.unitName?.slice(4),
            });
          }
        } else {
          this.unitIDsArray = [];
          this.unitIDsArray.push({
            id: this.selectedDevice?.unitId,
            label: this.selectedDevice?.unitName?.slice(4),
          });
        }

        this.unitIDsArray = this.unitIDsArray.sort((a: any, b: any) =>
          a.label.localeCompare(b.label)
        );
      }
    );
    this.subscriptions.add(deviceListSubscription);

    this.inputForm.valueChanges.subscribe(() => {
      this.formChanges = true;

      this.formChangesService.setFormChanged(this.formChanges);
    });
    this.formChanges = false;
  }

  loadData(deviceInfo: any) {
    if (
      deviceInfo.unitInfo == null ||
      deviceInfo.unitInfo == '' ||
      deviceInfo.unitInfo == undefined
    ) {
      this.unitIDsArray = [];
      this.unitIDsArray.push({
        id: this.selectedDevice?.unitId,
        label: this.selectedDevice?.unitName?.slice(4),
      });

      this.data = false;

      if (
        window.location.hostname == 'localhost' ||
        window.location.hostname == '127.0.0.1'
      ) {
        this.serverIp = null;
      } else {
        this.serverIp = window.location.hostname;
      }
      this.inputForm.patchValue({
        host: this.serverIp,
        unitId: this.selectedDevice?.unitName?.slice(4),
        branchPrefix: this.selectedDevice?.unitName?.slice(0, 3),
      });
    } else {
      this.data = true;
      this.deviceInfoList = deviceInfo;
      const logLevel = this.deviceInfoList?.unitInfo?.appInfo?.logLevel;

      const uppercaseLogLevel =
        logLevel && logLevel === logLevel.toLowerCase()
          ? logLevel.toUpperCase()
          : logLevel;

      this.inputForm.patchValue({
        systemType: this.deviceInfoList?.unitInfo?.appInfo?.systemType,
        logLevel: uppercaseLogLevel,
        unitId: this.deviceInfoList?.unitName.slice(4),
        branchPrefix: this.deviceInfoList?.unitName.slice(0, 3),
        isSSL: String(this.deviceInfoList?.unitInfo?.appInfo?.isSSL).toUpperCase()
      });
    }
  }
  onSystemTypeChange(value: any) {
    if (value === 'BROWSER_MODE') {
      this.portLabelText = this.translateService.instant(
        'field.settingsUpdateForm.port'
      );

      this.errorPortLabelText = this.translateService.instant(
        'error.form.port.required'
      );

      this.isBrowserMode = true;

      this.inputForm.patchValue({
        wsPort: window.location.port,
      });

      this.deviceDataService.isBrowserMode = true;
    } else {
      this.portLabelText = this.translateService.instant(
        'field.settingsUpdateForm.wsPort'
      );

      this.errorPortLabelText = this.translateService.instant(
        'error.form.wsPort.required'
      );
      this.isBrowserMode = false;

      this.inputForm.patchValue({
        wsPort: '',
      });
    }
  }

  onUnitIdChange(value: any) {}

  onHostChange(value: any) {
    if (value == 'localhost' || value == '127.0.0.1') {
      this.checkServerIp = true;
    } else {
      this.checkServerIp = false;
    }
  }

  onSubmit() {
    const IpAddress = this.inputForm.value.ipAddress;
    const System = this.inputForm.value.systemType;
    const LogLevel = this.inputForm.value.logLevel;
    const BranchPrefix = this.inputForm.value.branchPrefix;
    const UnitId = this.inputForm.value.unitId;
    const Host = this.inputForm.value.host;
    const WsPort = this.inputForm.value.wsPort;

    const unitID = BranchPrefix + ':' + UnitId;

    if (this.isBrowserMode) {
      const newAppInfo = {
        ...this.selectedDevice?.unitInfo?.appInfo,
        systemType: System,
        logLevel: LogLevel,
        unitId: unitID,
        ipAddress: IpAddress,
        host: Host,
        port: WsPort,
        origin: window.location.origin,
      };

      const newDisdplayInfo = {
        ...this.selectedDevice?.unitInfo,
        appInfo: newAppInfo,
      };
      const newResult = {
        ...this.selectedDevice,
        isLoader: true,
        unitInfo: newDisdplayInfo,
      };
      this.selectedDevice = newResult;
    } else {
      const newAppInfo = {
        ...this.selectedDevice?.unitInfo?.appInfo,
        systemType: System,
        logLevel: LogLevel,
        unitId: unitID,
        ipAddress: IpAddress,
        host: Host,
        wsPort: WsPort,
        origin: window.location.origin,
      };

      const newDisdplayInfo = {
        ...this.selectedDevice?.unitInfo,
        appInfo: newAppInfo,
      };
      const newResult = {
        ...this.selectedDevice,
        isLoader: true,
        unitInfo: newDisdplayInfo,
      };
      this.selectedDevice = newResult;
    }

    if (!this.data) {
      const filteredArray = this.unitIDsArray.filter(
        (obj) => obj.label === unitID.substring(4)
      );
      this.relevantId = filteredArray[0]?.id;
      if (!this.relevantId) {
        this.relevantId = this.selectedDevice?.unitId;
      }

      this.deviceDispatchers.selectedDeviceUpdateLocal(this.selectedDevice);
      this.deviceDispatchers.editedselectedDevice(this.selectedDevice);


      // const localStorageArray = JSON.parse(localStorage.getItem('deviceIds') || '[]');
      // localStorageArray.push(this.relevantId);
      // localStorage.setItem('deviceIds', JSON.stringify(localStorageArray));

    } else {
      if (this.selectedDevice?.connected) {
        const filteredArray = this.unitIDsArray.filter(
          (obj) => obj.label === unitID.substring(4)
        );
        this.relevantId = filteredArray[0]?.id;
        if (!this.relevantId) {
          this.relevantId = this.selectedDevice.unitId;
        }

        this.currentId = this.deviceInfoList.unitId;
        if (this.currentId == this.relevantId) {
          this.currentId = null;
          this.isUpdateUnitId = false;
          this.selectedDevice = {
            ...this.selectedDevice,
            newUnitId: this.relevantId,
            isUpdateUnitId: this.isUpdateUnitId,
          };
        } else {
          this.isUpdateUnitId = true;
          this.selectedDevice = {
            ...this.selectedDevice,
            newUnitId: this.relevantId,
            isUpdateUnitId: this.isUpdateUnitId,
          };
        }

        this.deviceDispatchers.selectedDeviceUpdate(this.selectedDevice);
        const timestamp = new Date().getTime();
        this.deviceListsubscriptionService.UpdatigDevices(this.selectedDevice,timestamp);
    //    this.deviceDispatchers.editedselectedDevice(this.selectedDevice);


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
  get host() {
    return this.inputForm.get('host') as FormControl;
  }
  get wsPort() {
    return this.inputForm.get('wsPort') as FormControl;
  }
  get port() {
    return this.inputForm.get('port') as FormControl;
  }
  get system() {
    return this.inputForm.get('systemType') as FormControl;
  }
  get logLevel() {
    return this.inputForm.get('logLevel') as FormControl;
  }
  get unitId() {
    return this.inputForm.get('unitId') as FormControl;
  }
  get branchPrefix() {
    return this.inputForm.get('branchPrefix') as FormControl;
  }
  get isSSL() {
    return this.inputForm.get('isSSL') as FormControl;
  }
  get printerMode() {
    return this.inputForm.get('printerMode') as FormControl;
  }
}
