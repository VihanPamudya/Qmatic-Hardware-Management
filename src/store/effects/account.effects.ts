import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs/operators';

import * as AccountActions from './../actions';
import { AccountDataService } from '../services';
import { Router } from '@angular/router';

const toAction = AccountActions.toAction();

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private translateService: TranslateService,
    private accountDataService: AccountDataService,
    private router: Router
  ) {}

  getAccountInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.FETCH_ACCOUNT_INFO),
      switchMap(() =>
        toAction(
          this.accountDataService.getAccountInfo(),
          AccountActions.FetchAccountInfoSuccess,
          AccountActions.FetchAccountInfoFail
        )
      )
    )
  );

  setLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.FETCH_ACCOUNT_INFO_SUCCESS),
        tap((action: AccountActions.FetchAccountInfoSuccess) => {
          this.translateService.use(
            action.payload.data.locale === 'en'
              ? ''
              : `_${action.payload.data.locale}`
          );
        })
      ),
    { dispatch: false }
  );
}
