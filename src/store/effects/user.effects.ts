import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import * as UserActions from './../actions';
import { UserDataService } from './../services/user/user-data.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../reducers';
import { switchMap, tap } from 'rxjs';

const toAction = UserActions.toAction();

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userDataService: UserDataService,
    private translateService: TranslateService,
    private store$: Store<IAppState>
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.FETCH_USER_INFO),
      switchMap(() =>
        toAction(
          this.userDataService.getUserInfo(),
          UserActions.FetchUserInfoSuccess,
          UserActions.FetchUserInfoFail
        )
      )
    )
  );

  getUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.FETCH_USER_INFO_SUCCESS),
        tap((action: UserActions.FetchUserInfoSuccess) => {
          this.translateService.use(
            action.payload.locale === 'en' ? '' : `_${action.payload.locale}`
          );
        })
      ),
    { dispatch: false }
  );
}
