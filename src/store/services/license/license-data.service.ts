import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILicense } from './../../../models/ILicense';
import { qsystemEndpoint } from '../data.service';
import { map } from 'rxjs/operators';

const APPOINTMENT_MANAGER_STANDARD_COMPONENT = 'Appointment Manager Standard';
const APPOINTMENT_MANAGER_PREMIUM_COMPONENT = 'Appointment Manager Premium';

@Injectable()
export class LicenseDataService {
  constructor(private http: HttpClient) {}

  getInfo(): Observable<any> {
    return this.http.get<any>(`${qsystemEndpoint}/license`).pipe(
      map((res: { components: [ILicense] }) => {
        const isValidLicense = res.components.reduce((result, next) => {
          if (
            next.name === APPOINTMENT_MANAGER_STANDARD_COMPONENT ||
            next.name === APPOINTMENT_MANAGER_PREMIUM_COMPONENT
          ) {
            result = result || +next.licensedAmount > 0;
          }
          return result;
        }, false);
        return isValidLicense;
      })
    );
  }
}
