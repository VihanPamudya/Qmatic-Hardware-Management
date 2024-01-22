import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IAccount } from '../../../models/IAccount';
import {
  USER_ROLE,
  ADMIN_ROLE,
  NO_ROLE
} from '../../reducers/user-role.reducer';
import { restEndpoint } from '../data.service';
import { GlobalErrorHandler } from 'src/services/util/global-error-handler.service';

const STAFF_DEVICE_CONFIGURATION_ROLE = 'qmaticShowConfiguration';
const STAFF_SUPER_ADMIN_ROLE = '*';

@Injectable()
export class UserRoleDataService {

  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) { }

  getUserRoleInfo(): Observable<any> {
    return this.http
      .get<IAccount>(`${restEndpoint}/account`).pipe(
      map((res: { modules: string[] }) => {
        const isStaffUser =
          res.modules.filter(module => module === STAFF_DEVICE_CONFIGURATION_ROLE).length > 0
            ? true
            : false;
        const isSuperAdminUser =
          res.modules.filter(module => module === STAFF_SUPER_ADMIN_ROLE)
            .length > 0
            ? true
            : false;
        let userRole = NO_ROLE;
        userRole = isStaffUser ? USER_ROLE : userRole;
        userRole = isSuperAdminUser ? ADMIN_ROLE : userRole;
        return userRole;
      }))
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
