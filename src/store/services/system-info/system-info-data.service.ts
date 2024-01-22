import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISystemInfo } from '../../../models/ISystemInfo';
import { qsystemEndpoint } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class SystemInfoDataService {

  constructor(private http: HttpClient) { }

  getSystemInfo(): Observable<any> {
    return this.http
      .get<ISystemInfo>(`${qsystemEndpoint}/servicepoint/systemInformation`)
      .pipe(map(
        (data) => {
            if (data['timeConvention']) {
              if (data['timeConvention'] === 'AM/PM') {
                data = {
                  ...data,
                  timeConvention: 'AMPM'
                };
              } else if (data['timeConvention'] === '24 hour') {
                data = {
                  ...data,
                  timeConvention: '24'
                };
              }
            }
            return data;
        }
      ));
  }
}
