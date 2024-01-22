import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { QmBranchListComponent } from './components/containers/qm-branch-list/qm-branch-list.component';
import { QmDeviceListTableComponent } from './components/containers/qm-device-list-table/qm-device-list-table.component';
import { QmHeaderComponent } from './components/containers/qm-page-header/qm-header.component';
import { QmFooterComponent } from './components/presentational/qm-page-footer/qm-footer.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HttpLoaderFactory } from '../i18n/TranslationsLoaderFactory';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AccountDispatchers, storeServices } from '../store';
import { LicenseDispatchers } from './../store/services/license/license.dispatchers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QmDeviceListComponent } from './components/containers/qm-device-list/qm-device-list.component';
import { QmMainComponent } from './components/containers/qm-main/qm-main.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import {
  NgbActiveModal,
  NgbModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { effects } from '../store/effects';
import { reducers } from '../store/reducers';
import { GlobalErrorHandler } from './../services/util/global-error-handler.service';
import { QmClearInputButtonComponent } from './directives/qm-clear-input-button/qm-clear-input-button.component';

import { ToastService } from './../services/util/toast.service';
import { QmLoaderComponent } from './components/presentational/qm-loader/qm-loader.component';
import { QmSettingsAdminModalComponent } from './components/presentational/qm-settings-admin-modal/qm-settings-admin-modal.component';
import { SettingsAutomaticUpgradeComponent } from './components/presentational/qm-settings-admin-modal/settings-automatic-upgrade/settings-automatic-upgrade.component';
import { SettingsDeviceComponent } from './components/presentational/qm-settings-admin-modal/settings-device/settings-device.component';
import { SettingsLogsComponent } from './components/presentational/qm-settings-admin-modal/settings-logs/settings-logs.component';
import { SettingsPinComponent } from './components/presentational/qm-settings-admin-modal/settings-pin/settings-pin.component';
import { QmClearInputDirective } from './directives/qm-clear-input.directive';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CodeInputModule } from 'angular-code-input';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { AccessModuleGuard } from 'src/routes/access-module-guard';
import { LicenseAuthGuard } from 'src/routes/license-auth-guard';
import { CometDService } from 'src/services/cometDataFunctions/comet-d.service';
import { CometData } from 'src/services/cometDataFunctions/comet-data';
import { QmDeviceGridViewComponent } from './components/containers/qm-device-grid-view/qm-device-grid-view.component';
import { QmErrorComponent } from './components/presentational/qm-error/qm-error.component';
import { SettingsCacheComponent } from './components/presentational/qm-settings-admin-modal/settings-cache/settings-cache.component';
import { SettingsUnitInfoComponent } from './components/presentational/qm-settings-admin-modal/settings-unit-info/settings-unit-info.component';
import { UtilHelper } from './util/unit-helper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function translateFactory(translate: TranslateService) {
  return async () => {
    return new Promise<void>((resolve) => {
      translate.onLangChange.subscribe(() => {
        resolve();
      });
    });
  };
}

const toastrGlobalOptions = {
  maxOpened: 3,
  autoDismiss: false,
  iconClasses: {
    error: 'icon-close-circle',
    info: 'icon-done-solid',
    success: 'icon-done-solid',
    warning: '',
  },
  messageClass: 'qm-toast__message',
  easing: 'ease-in-out',
  closeButton: false,
  timeOut: 5000000,
};

@NgModule({
  declarations: [
    AppComponent,
    QmHeaderComponent,
    QmFooterComponent,
    QmDeviceListTableComponent,
    QmBranchListComponent,
    QmMainComponent,
    QmDeviceListComponent,
    QmClearInputDirective,
    QmClearInputButtonComponent,
    QmLoaderComponent,
    QmSettingsAdminModalComponent,
    SettingsPinComponent,
    SettingsLogsComponent,
    SettingsDeviceComponent,
    SettingsAutomaticUpgradeComponent,
    SettingsUnitInfoComponent,
    SettingsCacheComponent,
    QmErrorComponent,
    QmDeviceGridViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatRadioModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    CdkAccordionModule,
    MatExpansionModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatToolbarModule,
    NgxMatTimepickerModule,
    NgbProgressbarModule,
    FlexLayoutModule,
    MatProgressBarModule,
    CodeInputModule.forRoot({
      codeLength: 4,
      isCharsCode: false,
    }),
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(toastrGlobalOptions),
    ToastContainerModule,
    NgbModule,
    CommonModule,
    NoopAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    ...storeServices,
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    TranslateService,
    GlobalErrorHandler,
    MatPaginatorIntl,
    NgbActiveModal,
    ToastService,
    CometDService,
    UtilHelper,
    CometData,
    AccessModuleGuard,
    LicenseAuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private translate: TranslateService,
    private licenseInfoDispatchers: LicenseDispatchers,
    private accountDispatchers: AccountDispatchers
  ) {
    // No Suffix for english language file (appointmentBookingMessages.properties)
    this.translate.setDefaultLang('en');
    this.licenseInfoDispatchers.fetchLicenseInfo();
    this.accountDispatchers.fetchAccountInfo();
  }
}
