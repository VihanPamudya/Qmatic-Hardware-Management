import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs/operators';
import { ToastService } from 'src/services/util/toast.service';
import { GlobalErrorHandler } from '../../services/util/global-error-handler.service';
import { UnitDataService } from '../services';
import * as UnitActions from './../actions';

const toAction = UnitActions.toAction();

@Injectable()
export class UnitEffects {
  constructor(
    private actions$: Actions,
    private translateService: TranslateService,
    private unitDataService: UnitDataService,
    private errorHandler: GlobalErrorHandler,
    private toastService: ToastService,
  ) {}

  getUnitList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnitActions.FETCH_UNITS_LIST),
      switchMap((action: UnitActions.FetchUnitList) =>
        toAction(
          this.unitDataService.getUnitList(action.payload.branchId),
          UnitActions.FetchUnitListSuccess,
          UnitActions.FetchUnitListFail
        )
      )
    )
  );

  getUnitListFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitActions.FETCH_UNITS_LIST_FAIL),
        tap((action: UnitActions.FetchUnitListFail) =>
        this.errorHandler.showError('Fail to fetch units', action.payload)
        ),
        switchMap(() => [])
      ),
    { dispatch: false }
  );

  getUnitListSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitActions.FETCH_UNITS_LIST_SUCCESS),
        tap((action: UnitActions.FetchUnitListSuccess) => {
          if (action.payload.length === 0) {
            this.translateService.get('label.list.no.device').subscribe(
              (label: string) => {
                this.toastService.errorToast(label);
              }
            ).unsubscribe();
          }
        })
      ),
    { dispatch: false }
  );

  // resetUnitList$ = createEffect(
  //   ()=>
  //   this.actions$.pipe(
  //     ofType(UnitActions.RESET_UNITS_LIST),
  //     tap((action: UnitActions.ResetUnitList)=>{

  //     })
  //   )
  // )
}
