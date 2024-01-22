import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LicenseInfoSelectors } from './../store/services/license/license.selectors';
import { map } from 'rxjs/operators';
@Injectable()
export class LicenseAuthGuard implements CanActivate {
  constructor(
    private licenseStatusSelector: LicenseInfoSelectors,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.licenseStatusSelector.getLicenseInfo$.pipe(
      map((licenseState) => {
        if (licenseState.loaded) {
          if (licenseState.status) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
    );
  }
}
