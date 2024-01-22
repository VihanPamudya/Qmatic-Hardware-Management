import { Injectable } from '@angular/core';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { IAccountState } from './../../reducers/account.reducer';

import { IAppState } from '../../reducers';
import { ACCESS_MODULES, ADMIN_ROLE } from './../../reducers/user-role.reducer';

// selectors
const getUserRoleState = createFeatureSelector<IAccountState>('account');

const getUserRole = createSelector(
  getUserRoleState,
  (state: IAccountState) => state.userRole
);

const isUserAdmin = createSelector(
  getUserRole,
  (state: string) => state && state.includes(ADMIN_ROLE)
);

const getUserAccessApp = createSelector(
  getUserRoleState,
  (state: IAccountState) => {
    if (state.loaded || state.error) {
      //this will check whether user has enabled required modules to access the app

      if (
        (state.error && (state.error as any).responseData.status === 401) ||
        ((state.modules && Object.keys(ACCESS_MODULES)).filter(
          (key: keyof typeof ACCESS_MODULES) =>
            state.modules.indexOf(ACCESS_MODULES[key]) < 0
        ).length > 0 &&
          state.modules.indexOf('*') == -1)
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
);

const getUserRoleLoadState = createSelector(getUserRoleState, (state: any) =>
  state && state.error ? true : state.loaded
);

@Injectable()
export class UserRoleSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  userRole$ = this.store.select(getUserRole);
  isUserAdmin$ = this.store.select(isUserAdmin);
  userRoleLoaded$ = this.store.select(getUserRoleLoadState);
  isUserAccessApp$ = this.store.select(getUserAccessApp);
}
