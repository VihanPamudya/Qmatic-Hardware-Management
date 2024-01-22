import { Action } from '@ngrx/store';
import { IUnit } from '../../models/IUnit';

export const FETCH_UNITS_LIST = '[Unit] FETCH_UNITS_LIST';
export const FETCH_UNITS_LIST_FAIL = '[Unit] FETCH_UNITS_LIST_FAIL';
export const FETCH_UNITS_LIST_SUCCESS = '[Unit] FETCH_UNITS_LIST_SUCCESS';
export const RESET_UNITS_LIST = '[Unit] RESET_UNITS_LIST';

export class FetchUnitList implements Action {
  readonly type = FETCH_UNITS_LIST;
  constructor(public payload: { branchId: any }) {}
}

export class FetchUnitListFail implements Action {
  readonly type = FETCH_UNITS_LIST_FAIL;
  constructor(public payload: Object) {}
}

export class FetchUnitListSuccess implements Action {
  readonly type = FETCH_UNITS_LIST_SUCCESS;
  constructor(public payload: IUnit[]) {}
}

export class ResetUnitList implements Action {
  readonly type = RESET_UNITS_LIST;
  constructor() {}
}

export type AllUnitActions = FetchUnitList
  | ResetUnitList
  | FetchUnitListFail
  | FetchUnitListSuccess;
