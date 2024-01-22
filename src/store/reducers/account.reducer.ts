import { IAccount } from './../../models/IAccount';
import * as AccountActions from '../actions';

export interface IAccountState {
  data: IAccount;
  userRole: any;
  modules: any;
  loading: boolean;
  loaded: boolean;
  error: Object | null;
}

const initialState = {
  data: {
    id: null,
    userName: '',
    firstName: '',
    lastName: '',
    locale: '',
    direction: '',
    status: '',
    fullName: '',
    modules: [],
  },
  userRole: [],
  modules: [],
  loading: false,
  loaded: false,
  error: null,
};

export function reducer(
  state: IAccountState = initialState,
  action: AccountActions.AllAccountActions
): IAccountState {
  switch (action.type) {
    case AccountActions.FETCH_ACCOUNT_INFO: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case AccountActions.FETCH_ACCOUNT_INFO_SUCCESS: {
      return {
        ...state,
        data: {
          ...action.payload.data,
        },
        userRole: action.payload.userRole,
        modules: action.payload.data.modules,
        loading: false,
        loaded: true,
        error: null,
      };
    }
    case AccountActions.FETCH_ACCOUNT_INFO_FAIL: {
      return {
        ...state,
        data: initialState.data,
        loading: false,
        loaded: false,
        error: {
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}
