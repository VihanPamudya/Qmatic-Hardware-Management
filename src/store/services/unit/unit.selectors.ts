import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { IAppState } from "../../reducers";
import { IUnitState } from '../../reducers/unit.reducer'


const getUnitState = createFeatureSelector<IUnitState>('unit');

const getUnitList = createSelector(
    getUnitState,
    (state: IUnitState) => state.unitList
);

const getUnitsLoading = createSelector(
    getUnitState,
    (state: IUnitState) => state.loading
  );

  const getUnitsLoaded = createSelector(
    getUnitState,
    (state: IUnitState) => state.loaded
  );

@Injectable()
export class UnitSelectors {
    constructor(private store: Store<IAppState>) { }
    unitList$ = this.store.select(getUnitList);
    unitsLoading$ = this.store.select(getUnitsLoading);
    unitsLoaded$ = this.store.select(getUnitsLoaded);
}