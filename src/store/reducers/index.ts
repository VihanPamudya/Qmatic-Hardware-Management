import { ActionReducerMap, ActionReducer } from '@ngrx/store';

import * as fromSystemInfo from './system-info.reducer';
import * as fromLicense from './license.reducer';
import * as fromUserRole from './user-role.reducer';
import * as fromAccount from './account.reducer';
import * as fromBranches from './branch.reducer';
import * as fromUser from './user.reducer';
import * as fromUnit from './unit.reducer';
import * as fromDevice from './device.reducers';

export interface IAppState {
  systemInfo: fromSystemInfo.ISystemInfoState;
  license: fromLicense.ILicenseState;
  userRole: fromUserRole.IUserRoleState;
  account: fromAccount.IAccountState;
  branches: fromBranches.IBranchState;
  user: fromUser.IUserState;
  unit: fromUnit.IUnitState;
  device: fromDevice.IDeviceState;
}

export const reducers: ActionReducerMap<IAppState> = {
  systemInfo:
    fromSystemInfo.reducer as ActionReducer<fromSystemInfo.ISystemInfoState>,
  license: fromLicense.reducer as ActionReducer<fromLicense.ILicenseState>,
  userRole: fromUserRole.reducer as ActionReducer<fromUserRole.IUserRoleState>,
  account: fromAccount.reducer as ActionReducer<fromAccount.IAccountState>,
  branches: fromBranches.reducer as ActionReducer<fromBranches.IBranchState>,
  user: fromUser.reducer as ActionReducer<fromUser.IUserState>,
  unit: fromUnit.reducer as ActionReducer<fromUnit.IUnitState>,
  device: fromDevice.reducer as ActionReducer<fromDevice.IDeviceState>
};
