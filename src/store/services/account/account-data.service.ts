import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IAccount } from '../../../models/IAccount';
import {
  USER_ROLE,
  ADMIN_ROLE,
  APPOINTMENT_LIST_ROLE,
  NO_ROLE,
} from '../../reducers/user-role.reducer';
import { restEndpoint } from '../data.service';
import { GlobalErrorHandler } from 'src/services/util/global-error-handler.service';
import { Router } from '@angular/router';

const STAFF_DEVICE_CONFIGURATION_ROLE = 'qmaticShowConfiguration';
const STAFF_SUPER_ADMIN_ROLE = '*';

@Injectable()
export class AccountDataService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandler: GlobalErrorHandler
  ) {}

  getAccountInfo(): Observable<{ data: IAccount; userRole: [string] } | any> {
    return this.http
      .get<IAccount>(`${restEndpoint}/account`)
      .pipe(
        map((res: IAccount) => {
          const isStaffUser =
            res.modules.filter(
              (module) => module === STAFF_DEVICE_CONFIGURATION_ROLE
            ).length > 0
              ? true
              : false;
          const isSuperAdminUser =
            res.modules.filter((module) => module === STAFF_SUPER_ADMIN_ROLE)
              .length > 0
              ? true
              : false;
          let userRole = NO_ROLE;
          userRole = isStaffUser ? USER_ROLE : userRole;
          userRole = isSuperAdminUser ? ADMIN_ROLE : userRole;

          // Remove boolean value(rtl or not) from the local
          res.locale = res.locale && res.locale.split(':')[0];

          let arrRole = [];
          arrRole.push(userRole);

          return { data: res, userRole: arrRole };
        })
      )
      // .pipe(catchError(this.errorHandler.handleError()));
  }
}
