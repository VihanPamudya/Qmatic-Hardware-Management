import { Action } from '@ngrx/store';
import { IUser } from 'src/models/IUser';

export const FETCH_USER_INFO = '[User] FETCH_USER_INFO';
export const FETCH_USER_INFO_SUCCESS = '[User] FETCH_USER_SUCCESS';
export const FETCH_USER_INFO_FAIL = '[User] FETCH_USER_INFO_FAIL';

export class FetchUserInfo implements Action {
  readonly type = FETCH_USER_INFO;
}

export class FetchUserInfoSuccess implements Action {
  readonly type = FETCH_USER_INFO_SUCCESS;
  constructor(public payload: IUser) {}
}

export class FetchUserInfoFail implements Action {
  readonly type = FETCH_USER_INFO_FAIL;
  constructor(public payload: Object) {}
}



export type AllUserActions = FetchUserInfo
                        | FetchUserInfoSuccess
                        | FetchUserInfoFail;
