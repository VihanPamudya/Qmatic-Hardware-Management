import { Action} from '@ngrx/store';
import { IBranchModel } from 'src/models/IBranch';

export const FETCH_BRANCH_LIST = '[Branch] FETCH_BRANCH_LIST';
export const FETCH_BRANCH_LIST_FAIL = '[Branch] FETCH_BRANCH_LIST_FAIL';
export const FETCH_BRANCH_LIST_SUCCESS = '[Branch] FETCH_BRANCH_LIST_SUCCESS';
export const SELECTED_BRANCH = '[Branch] SELECTED_BRANCH';
export const SELECTED_BRANCH_RESET = '[Branch] SELECTED_BRANCH_RESET';



export class FetchBranchList implements Action{
  readonly type =FETCH_BRANCH_LIST;
}

export class FetchBranchListSuccess implements Action {
  readonly type = FETCH_BRANCH_LIST_SUCCESS;
  constructor(public payload: IBranchModel[]) {}
}

export class FetchBranchListFail implements Action {
  readonly type = FETCH_BRANCH_LIST_FAIL;
  constructor(public payload: Object) {}
}

export class SelectedBranch implements Action{
  readonly type =SELECTED_BRANCH;
  constructor(public payload: IBranchModel) {}
}

export class SelectedBranchReset implements Action{
  readonly type =SELECTED_BRANCH_RESET;
}




export type AllBranchActions = FetchBranchList |
                               FetchBranchListFail |
                               FetchBranchListSuccess|
                               SelectedBranch|
                               SelectedBranchReset;
