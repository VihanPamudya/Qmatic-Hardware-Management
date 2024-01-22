import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as SystemInfoActions from './../actions';
import {  } from '../services';
import { SystemInfoDataService } from '../services';

const toAction = SystemInfoActions.toAction();

@Injectable()
export class SystemInfoEffects {
  constructor(
    private actions$: Actions,
    private systemInfoDataService: SystemInfoDataService
  ) {}

  
  getSystemInfo$ = createEffect(() =>
  this.actions$.pipe(
    ofType(SystemInfoActions.FETCH_SYSTEM_INFO),
    switchMap(() =>
      toAction(
        this.systemInfoDataService.getSystemInfo(),
        SystemInfoActions.FetchSystemInfoSuccess,
        SystemInfoActions.FetchSystemInfoFail
      )
    )
  )
);
}
