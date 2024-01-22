import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QmSettingsAdminModalComponent } from './components/presentational/qm-settings-admin-modal/qm-settings-admin-modal.component';
import { SettingsAutomaticUpgradeComponent } from './components/presentational/qm-settings-admin-modal/settings-automatic-upgrade/settings-automatic-upgrade.component';
import { SettingsCacheComponent } from './components/presentational/qm-settings-admin-modal/settings-cache/settings-cache.component';
import { SettingsDeviceComponent } from './components/presentational/qm-settings-admin-modal/settings-device/settings-device.component';
import { SettingsLogsComponent } from './components/presentational/qm-settings-admin-modal/settings-logs/settings-logs.component';
import { SettingsPinComponent } from './components/presentational/qm-settings-admin-modal/settings-pin/settings-pin.component';
import { SettingsUnitInfoComponent } from './components/presentational/qm-settings-admin-modal/settings-unit-info/settings-unit-info.component';
import { QmMainComponent } from './components/containers/qm-main/qm-main.component';
import { AccessModuleGuard } from 'src/routes/access-module-guard';
import { LicenseAuthGuard } from 'src/routes/license-auth-guard';
import { QmErrorComponent } from './components/presentational/qm-error/qm-error.component';
import { QmDeviceGridViewComponent } from './components/containers/qm-device-grid-view/qm-device-grid-view.component';
import { QmDeviceListComponent } from './components/containers/qm-device-list/qm-device-list.component';

const routes: Routes = [
  {
    path: '',
    component: QmDeviceListComponent,
    canActivate: [AccessModuleGuard, LicenseAuthGuard],
  },
  { path: 'grid-view', component: QmDeviceGridViewComponent },
  { path: 'modal', component: QmSettingsAdminModalComponent },
  { path: 'error', component: QmErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
