import { Injectable } from '@angular/core';
import { IBranchState } from 'src/store/reducers/branch.reducer';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { IAppState } from 'src/store/reducers';
import { state } from '@angular/animations';

const getBranchState = createFeatureSelector<IBranchState>('branches');

const getAllBranches = createSelector(
  getBranchState,
  (state: IBranchState) => state.branches
);
const selectedBranch = createSelector(
  getBranchState,
  (state: IBranchState)=> state.selectedBranch
)


@Injectable()
export class BranchSelectors {
  constructor(private store: Store<IAppState>) {}

  branches$ = this.store.select(getAllBranches);
  selectedBranch$ = this.store.select(selectedBranch);

}
