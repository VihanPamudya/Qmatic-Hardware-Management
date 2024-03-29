import { IUser } from 'src/models/IUser';
import * as UserActions from '../actions';

export interface IUserState {
  user: IUser;
  loading: boolean;
  loaded: boolean;
  error: Object | null;
}

export const initialState: IUserState = {
  user: {
    id: '',
    userName: '',
    firstName: '',
    lastName: '',
    locale: '',
    direction: '',
    fullName: '',
    isAdmin: true,
  },
  loading: false,
  loaded: false,
  error: '',
};

export function reducer(
  state: IUserState = initialState,
  action: UserActions.AllUserActions
): IUserState {
  switch (action.type) {
    case UserActions.FETCH_USER_INFO: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case UserActions.FETCH_USER_INFO_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        loading: false,
        loaded: true,
        error: null,
      };
    }
    case UserActions.FETCH_USER_INFO_FAIL: {
      return {
        ...state,
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
