import { IBranchModel } from "src/models/IBranch";
import * as BranchActions from '../actions';

export interface IBranchState {
  branches: IBranchModel[];
  selectedBranch: IBranchModel | null;
  searchText: string;
  loading: boolean;
  loaded: boolean;
  error: Object;
};

export const initialState : IBranchState = {
  branches: [],
  selectedBranch:null,
  searchText: '',
  loading: false,
  loaded: false,
  error: ''
};

 export function reducer (
  state: IBranchState = initialState,
  action: BranchActions.AllBranchActions
 ): IBranchState{
  switch (action.type) {
    case BranchActions.FETCH_BRANCH_LIST: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }
    case BranchActions.FETCH_BRANCH_LIST_SUCCESS: {
      return {
        ...state,
        branches: sortBranches(action.payload),
        loading: false,
        loaded: true,
        error: ''
      };
    }
    case BranchActions.FETCH_BRANCH_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case BranchActions.SELECTED_BRANCH: {
      return {
        ...state,
        selectedBranch : selectedBranchUpdate(state.selectedBranch,action.payload),
        error: ''
      }
    }
    case BranchActions.SELECTED_BRANCH_RESET: {
      return {
        ...state,
        selectedBranch : null,
        error: ''
      }
    }
    default: {
      return state;
    }
  }

 //sort branches alphabetically
 function sortBranches(branchList: IBranchModel[]): IBranchModel[] {
   return branchList.slice().sort(
     (branch1: IBranchModel, branch2: IBranchModel) => {
       if (branch1.name.toLowerCase() < branch2.name.toLowerCase() ) { return -1; }
       if (branch1.name.toLowerCase() > branch2.name.toLowerCase() ) { return 1; }
       return 0;
     }
   );
  }
}

function selectedBranchUpdate(selectedBranch:any,newBranch: any){
  if(!selectedBranch){
    return newBranch;
  }
  else{
    if(selectedBranch.name == newBranch.name){
      return selectedBranch;
    }
    else{
      return newBranch;
    }
  }
}

