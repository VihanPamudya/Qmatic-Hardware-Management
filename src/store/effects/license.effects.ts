import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import * as LicenseActions from './../actions';
import { LicenseDataService } from '../services';

const toAction = LicenseActions.toAction();

@Injectable()
export class LicenseInfoEffects {
  constructor(
    private actions$: Actions,
    private licenseInfoDataService: LicenseDataService
  ) {}

  getLicenseInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LicenseActions.FETCH_LICENSE_INFO),
      switchMap(() =>
        toAction(
          this.licenseInfoDataService.getInfo(),
          LicenseActions.FetchLicenseInfoSuccess,
          LicenseActions.FetchLicenseFail
        )
      )
    )
  );
}
