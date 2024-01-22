import { IUnit } from '../../models/IUnit';
import * as UnitActions from '../actions';

export interface IUnitState {
  unitList: IUnit[];
  loading: any;
  loaded: boolean;
  error: Object | null;
}

export const initialState: IUnitState = {
  unitList: [],
  loading: false,
  loaded: false,
  error: null,
};

export function reducer(
  state: IUnitState = initialState,
  action: UnitActions.AllUnitActions
): IUnitState {
  switch (action.type) {
    case UnitActions.FETCH_UNITS_LIST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case UnitActions.FETCH_UNITS_LIST_SUCCESS: {
      return {
        ...state,
        unitList: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    }
    case UnitActions.FETCH_UNITS_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case UnitActions.RESET_UNITS_LIST: {
      return {
        ...state,
        unitList: [],
        loading: false,
        loaded: true,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
}
