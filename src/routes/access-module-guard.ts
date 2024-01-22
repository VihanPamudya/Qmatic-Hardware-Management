import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoleSelectors } from './../store/services/user-role/user-role.selectors';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AccessModuleGuard {
  public isAccessApp!: boolean;
  constructor(
    private userRoleSelector: UserRoleSelectors,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userRoleSelector.userRoleLoaded$.pipe(
      filter((status) => status === true),
      switchMap(() => {
        return this.userRoleSelector.isUserAccessApp$;
      }),
      map((canAccess: boolean) => {
        let isActivated = true;
        this.isAccessApp = canAccess;

        if (!canAccess) {
          this.router.navigate(['/error'], {
            queryParams: {
              'error-label-key': 'label.invalidAccessModules.error',
            },
          });

          isActivated = false;
        }
        return isActivated;
      })
    );
  }
}
