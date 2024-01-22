import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CodeInputComponent } from 'angular-code-input';
import { Observable, Subscription } from 'rxjs';
import { IDevice } from 'src/models/IDevice';

import { ToastService } from 'src/services/util/toast.service';
import { DeviceDataService, DeviceSelectors } from 'src/store';

@Component({
  selector: 'app-settings-pin',
  templateUrl: './settings-pin.component.html',
  styleUrls: ['./settings-pin.component.scss'],
})
export class SettingsPinComponent implements OnInit {
  @ViewChild('firstCodeInput') firstCodeInput!: CodeInputComponent;
  @ViewChild('secondCodeInput') secondCodeInput!: CodeInputComponent;
  public firstCode!: string;
  public secondCode!: string;
  public firstCodeChange: string = '';
  public secondCodeChange: string = '';
  public deviceList$!: Observable<IDevice[]>;
  public data: boolean = true;
  private subscriptions: Subscription = new Subscription();
  public selectedDevice$!: Observable<IDevice | null>;
  public selectedDevice!: IDevice | null;
  public isDisable: boolean = true;

  constructor(
    private deviceDataService: DeviceDataService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private deviceSelectors: DeviceSelectors
  ) {
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
    if (deviceInfo.unitInfoInfo == null) {
      this.data = false;
    }
  }

  submitPin() {
    if (this.firstCodeChange == this.secondCodeChange) {
      this.deviceDataService
        .upgradePin(this.deviceDataService.deviceID, this.secondCodeChange)
        .subscribe((response) => {
          console.log('response:', response);
        });

      this.translateService
        .get('label.list.pin.match')
        .subscribe((label: string) => {
          this.toastService.successToast(label);
        })
        .unsubscribe();
      this.resetInputs();
      this.firstCodeChange = '';
      this.secondCodeChange = '';
      this.isDisable = true;
    } else {
      this.translateService
        .get('label.list.no.pin.match')
        .subscribe((label: string) => {
          this.toastService.errorToast(label);
        })
        .unsubscribe();
      this.resetInputs();
      this.firstCodeChange = '';
      this.secondCodeChange = '';
      this.isDisable = true;
    }
  }

  resetInputs() {
    this.firstCodeInput.reset();
    this.secondCodeInput.reset();
  }

  onCodeCompleted(code: string) {
    this.firstCode = code;
  }

  onCodeChanged(code: string) {
    this.firstCodeChange = code;
    this.updateButtonState();
  }

  onSecondCodeChanged(code: string) {
    this.secondCodeChange = code;
    this.updateButtonState();
  }

  onSecondCodeCompleted(code: string) {
    this.secondCode = code;
  }

  updateButtonState() {
    if (
      this.firstCodeChange.length === 4 &&
      this.secondCodeChange.length === 4
    ) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  }
}
