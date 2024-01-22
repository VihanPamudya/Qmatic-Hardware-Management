import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IUnit } from 'src/models/IUnit';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UnitDataService {
  constructor(
    private http: HttpClient,
    private errorHandler: GlobalErrorHandler
  ) {}

  getUnitList(branchId: any): Observable<IUnit[]> {
    return this.http
      .get<IUnit[]>(`/rest/dm/branches/${branchId}/units/`)
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
