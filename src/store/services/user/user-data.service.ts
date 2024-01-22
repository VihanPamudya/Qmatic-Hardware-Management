import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from 'src/models/IUser';
import { GlobalErrorHandler } from 'src/services/util/global-error-handler.service';


@Injectable()
export class UserDataService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandler: GlobalErrorHandler
  ) {}

  getUserInfo(): Observable<any> {
    return this.http.get<IUser>('/rest/servicepoint/user/')
    .pipe(catchError(this.errorHandler.handleError()));

  }
}
