import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { IAccount } from 'src/models/IAccount';
import { IUser } from 'src/models/IUser';
import { IAppState } from 'src/store/reducers';
import { IAccountState } from 'src/store/reducers/account.reducer';
import { IUserState } from 'src/store/reducers/user.reducer';

const getUserState = createFeatureSelector<IAccountState>('account');

const getUser = createSelector(
  getUserState,
  (state: IAccountState) => state.data
);

const getUserFullName = createSelector(
  getUser,
  (state: IAccount) => state.fullName
);

export const getUserLocale = createSelector(
  getUser,
  (state: IAccount) => state.locale
);

const getUserDirection = createSelector(
  getUser,
  // set default user direction as ltr for fix AB-537
  (state: IAccount) => state.direction ? state.direction : "ltr"
);

@Injectable()
export class UserSelectors {
  constructor(private store: Store<IAppState>) {}
  user$ = this.store.select(getUser);
  userFullName$ = this.store.select(getUserFullName);
  userLocale$ = this.store.select(getUserLocale);
  userDirection$ = this.store.select(getUserDirection);
}
