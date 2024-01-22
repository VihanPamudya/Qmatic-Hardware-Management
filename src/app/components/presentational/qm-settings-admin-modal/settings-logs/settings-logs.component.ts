import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { IDevice } from 'src/models/IDevice';
import { ToastService } from 'src/services/util/toast.service';
import {
  DeviceDataService,
  DeviceDispatchers,
  DeviceSelectors,
  UserSelectors,
} from 'src/store';

@Component({
  selector: 'app-settings-logs',
  templateUrl: './settings-logs.component.html',
  styleUrls: ['./settings-logs.component.scss'],
})
export class SettingsLogsComponent implements OnInit {
  inputForm: FormGroup;
  public deviceList$!: Observable<IDevice[]>;
  public responseObject: IDevice[] = [];
  private subscriptions: Subscription = new Subscription();
  public decodedResponse: any;
  public filteredResponse: any;
  public logsLoading!: boolean;
  public logsList$!: Observable<IDevice[]>;
  public selectedDevice$!: Observable<IDevice | null>;
  public selectedDevice!: IDevice | null;
  public isRtl!: boolean;
  public userDirection$!: Observable<string>;
  public logsFound!: boolean;
  public isLoaderDeviceLogs: any;
  public unitId: any;
  public lines: any;
  public isEntryPoint!: boolean;
  logLevels = [{ label: 'INFO' }, { label: 'WARN' }, { label: 'ERROR' }];

  constructor(
    private deviceDataService: DeviceDataService,
    private formBuilder: FormBuilder,
    private deviceSelectors: DeviceSelectors,
    private translateService: TranslateService,
    private toastService: ToastService,
    private userSelectors: UserSelectors,
    private deviceDispatchers: DeviceDispatchers
  ) {
    this.deviceList$ = this.deviceSelectors.deviceList$;
    this.logsList$ = this.deviceSelectors.getLogs$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.selectedDevice$ = this.deviceSelectors.selectedDevice$;
    this.inputForm = this.formBuilder.group({
      logLevel: ['', [Validators.maxLength(20), Validators.required]],
    });
  }
  ngOnInit() {
    const deviceSubscription = this.selectedDevice$.subscribe((data) => {
      this.selectedDevice = data;
      this.unitId = data?.unitId;
    });
    this.subscriptions.add(deviceSubscription);

    this.subscriptions.add(deviceSubscription);

    const deviceSubscriptioncheck1 = this.deviceList$.subscribe((data) => {
      const updatedDevices = data.map((device) => {
        if (device.unitId === this.unitId) {
          if (device.isLoaderDeviceLogs == true) {
            this.isLoaderDeviceLogs = true;
          } else if (device.isLoaderDeviceLogs == false) {
            this.isLoaderDeviceLogs = false;
          }
        }
        return device;
      });
    });
    this.subscriptions.add(deviceSubscriptioncheck1);

    this.loadData(this.selectedDevice);
    this.setRtlStyles();
    this.syncDevice();
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
    if (
      deviceInfo.unitInfo == null ||
      deviceInfo.unitInfo == '' ||
      deviceInfo.unitInfo == undefined
    ) {
      console.log('There is no logs!');
    } else {
      const logLevel = deviceInfo?.unitInfo?.appInfo?.logLevel;
      const uppercaseLogLevel =
        logLevel && logLevel === logLevel.toLowerCase()
          ? logLevel.toUpperCase()
          : logLevel;
      this.inputForm.patchValue({
        logLevel: uppercaseLogLevel,
      });
    }
  }

  syncDevice() {
    this.deviceDataService.syncDevice(this.unitId).subscribe(
      (response) => {
        console.log('syncDevice response: ', response);
      },
      (error) => {
        console.log('syncDevice error: ', error);
      }
    );

    const newResult = {
      ...this.selectedDevice,
      isLoaderDeviceLogs: true,
    };
    this.selectedDevice = newResult;

    this.deviceDispatchers.editedselectedDevice(this.selectedDevice);
  }

  getLogs() {
    const effectiveLogLevel = this.inputForm?.get('logLevel')?.value;

    if (this.selectedDevice?.connected) {
      this.logsLoading = true;
      const logsSubscription = this.logsList$.subscribe((data: any) => {
        if (data != null || data != undefined) {
          console.log("Logs Coming...");

          this.decodedResponse = atob(data);
          this.lines = this.decodedResponse.split('\n');

          if (this.selectedDevice?.isDisplayPoint == false) {
            this.isEntryPoint = true;

            setTimeout(() => {
              if (this.isLoaderDeviceLogs == false) {
                this.logsLoading = false;
              }
            }, 3000);

            setTimeout(() => {
              if (this.isLoaderDeviceLogs == true) {
                this.logsLoading = false;
              }
            }, 6000);
            this.filteredResponse = this.lines.join('\n');
          } else {
            this.isEntryPoint = false;

            const infos = /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\s+INFO/g;
            const errors = /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\s+ERROR/g;
            const warn = /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\s+WARN/g;

            if (effectiveLogLevel.toLowerCase() === 'info') {
              setTimeout(() => {
                if (this.isLoaderDeviceLogs == false) {
                  this.logsLoading = false;
                }
              }, 2000);

              setTimeout(() => {
                if (this.isLoaderDeviceLogs == true) {
                  this.logsLoading = false;
                }
              }, 6000);

              const filteredLines = this.lines.filter((line: any) =>
                infos.test(line)
              );
              if (filteredLines.length === 0) {
                this.logsFound = false;
              }
              this.filteredResponse = filteredLines.join('\n');
            } else if (effectiveLogLevel.toLowerCase() === 'warn') {
              setTimeout(() => {
                if (this.isLoaderDeviceLogs == false) {
                  this.logsLoading = false;
                }
              }, 2000);

              setTimeout(() => {
                if (this.isLoaderDeviceLogs == true) {
                  this.logsLoading = false;
                }
              }, 6000);

              const filteredLines = this.lines.filter((line: any) =>
                warn.test(line)
              );
              if (filteredLines.length === 0) {
                this.logsFound = false;
              }

              this.filteredResponse = filteredLines.join('\n');
            } else if (effectiveLogLevel.toLowerCase() === 'error') {
              setTimeout(() => {
                if (this.isLoaderDeviceLogs == false) {
                  this.logsLoading = false;
                }
              }, 2000);

              setTimeout(() => {
                if (this.isLoaderDeviceLogs == true) {
                  this.logsLoading = false;
                }
              }, 6000);

              const filteredLines = this.lines.filter((line: any) =>
                errors.test(line)
              );

              if (filteredLines.length === 0) {
                this.logsFound = false;
              }

              this.filteredResponse = filteredLines.join('\n');
            } else {
              this.filteredResponse = this.lines.join('\n');
              if (this.filteredResponse.length === 0) {
                this.logsFound = false;
              }
            }
          }
        } else {
          this.logsLoading = true;
          setTimeout(() => {
            this.logsLoading = false;
          }, 2000);
        }
      });
      this.subscriptions.add(logsSubscription);
    } else {
      const newResult = {
        ...this.selectedDevice,
        isLoaderDeviceLogs: false,
      };
      this.selectedDevice = newResult;

      this.deviceDispatchers.editedselectedDevice(this.selectedDevice);

      setTimeout(() => {
        this.translateService
          .get('label.list.update.not.connected')
          .subscribe((label: string) => {
            this.toastService.errorToast(label);
          })
          .unsubscribe();
      }, 1000);
    }
  }

  exportLogs() {
    const currentTime = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    const formattedDateTime = currentTime
      .toLocaleString('en-US', options)
      .replace(/[/\s:]/g, '-');
    const filename = 'logs_' + formattedDateTime + '.txt';

    const blob = new Blob([this.filteredResponse], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
