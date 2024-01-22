// import { Injectable } from '@angular/core';
// import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

// import { IAppState } from '../../reducers';
// import { IAccountState } from '../../reducers/account.reducer';
// import { IAccount } from '../../../models/IAccount';

// // selectors
// const getUserState = createFeatureSelector<IAccountState>('account');

// const getUser = createSelector(
//   getUserState,
//   (state: IAccountState) => state.data
// );

// const getUserDirection = createSelector(
//   getUser,
//   // set default user direction as ltr for fix AB-537
//   (state: IAccount) => (state.direction ? state.direction : 'ltr')
// );

// @Injectable()
// export class AccountSelectors {
//   constructor(private store: Store<IAppState>) {}
//   // selectors$
//   user$ = this.store.select(getUser);
//   userDirection$ = this.store.select(getUserDirection);
// }
