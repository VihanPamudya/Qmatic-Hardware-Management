import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import * as UnitActions from '../../actions';

@Injectable()
export class UnitDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchUnitList(branchId: any) {
    this.store.dispatch(
      new UnitActions.FetchUnitList({branchId:branchId})
    );
  }
  resetUnitList() {
    this.store.dispatch(
      new UnitActions.ResetUnitList()
    );
  }
}
