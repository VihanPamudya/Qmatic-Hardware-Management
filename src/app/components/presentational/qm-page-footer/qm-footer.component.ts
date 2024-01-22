import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessModuleGuard } from 'src/routes/access-module-guard';
import { ISystemInfo } from '../../../../models/ISystemInfo';
import {
  LicenseInfoSelectors,
  SystemInfoSelectors,
  UserRoleSelectors,
} from '../../../../store';

@Component({
  selector: 'app-qm-footer',
  templateUrl: './qm-footer.component.html',
  styleUrls: ['./qm-footer.component.scss'],
})
export class QmFooterComponent implements OnInit {
  public systemInformation$: Observable<ISystemInfo>;
  public licenseIsValid$: Observable<boolean>;
  public isUserAccessApp$: Observable<boolean>;

  constructor(
    private systemInfoSelectors: SystemInfoSelectors,
    private licenseInfoSelectors: LicenseInfoSelectors,
    private userRoleSelectors: UserRoleSelectors,
    private accessModuleGuard: AccessModuleGuard
  ) {
    this.systemInformation$ = this.systemInfoSelectors.systemInfo$;
    this.licenseIsValid$ = this.licenseInfoSelectors.isValidLicense$;
    this.isUserAccessApp$ = this.userRoleSelectors.isUserAccessApp$;
  }

  ngOnInit() {
    this.isUserAccessApp$.subscribe(() => {});
  }

  get accessApp() {
    return this.accessModuleGuard.isAccessApp;
  }

  hasValidLicense(systemInfo: { licenseCompanyName: string | null }) {
    return (
      systemInfo.licenseCompanyName !== null &&
      systemInfo.licenseCompanyName !== ''
    );
  }
}
