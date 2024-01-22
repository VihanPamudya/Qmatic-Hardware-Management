import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as UserRoleActions from './../actions';
import { UserRoleDataService } from './../services';

const toAction = UserRoleActions.toAction();

@Injectable()
export class UserRoleEffects {
  constructor(
    private actions$: Actions,
    private userRoleDataService: UserRoleDataService
  ) {}

  getUserRoleInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRoleActions.FETCH_USER_ROLE_INFO),
      switchMap(() =>
        toAction(
          this.userRoleDataService.getUserRoleInfo(),
          UserRoleActions.FetchUserRoleInfoSuccess,
          UserRoleActions.FetchUserRoleInfoFail
        )
      )
    )
  );
}
