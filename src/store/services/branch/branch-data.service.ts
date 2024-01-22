import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { IBranchModel } from 'src/models/IBranch';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';

@Injectable()
export class BranchDataService {
  constructor(
    private http: HttpClient,
    private errorHandler: GlobalErrorHandler
  ) {}

  getBranchList(): Observable<any> {
    return this.http
      .get<IBranchModel[]>('/rest/dm/branches/')
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
