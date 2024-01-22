import { Injectable } from '@angular/core';
import { createEffect ,Actions, ofType } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as BranchActions from './../actions';
import { BranchDataService} from '../services';
import { Store } from '@ngrx/store';
import { IAppState } from '../reducers';
import { TranslateService } from '@ngx-translate/core';
import { GlobalErrorHandler } from 'src/services/util/global-error-handler.service';

const toAction = BranchActions.toAction();


@Injectable()
export class BranchEffects {
  constructor(
    private actions$: Actions,
    private branchDataService: BranchDataService,
    private translateService: TranslateService,
    private errorHandler: GlobalErrorHandler,
    private store$: Store<IAppState>,
  ){}

  getBranchList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchActions.FETCH_BRANCH_LIST),
       switchMap(() =>
         toAction(
          this.branchDataService.getBranchList(),
          BranchActions.FetchBranchListSuccess,
          BranchActions.FetchBranchListFail
        )
      )
    )
  );

  getBranchListFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchActions.FETCH_BRANCH_LIST_FAIL),
      tap((action: BranchActions.FetchBranchListFail) =>
      this.errorHandler.showError('Fail to fetch branches', action.payload)
      ),
      switchMap(() => [])
      ),
    { dispatch: false }
  );

  getBranchListSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchActions.FETCH_BRANCH_LIST_SUCCESS),
      tap((action: BranchActions.FetchBranchListSuccess) => {
        if (action.payload.length === 0) {
          this.translateService
            .get('label.list.no.branches')
            .subscribe((label: string) => {
              console.log(label);
            })
            .unsubscribe();
          }
        })
      ),
    { dispatch: false }
  );

}
