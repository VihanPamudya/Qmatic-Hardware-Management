import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IDevice } from 'src/models/IDevice';
import { GlobalErrorHandler } from 'src/services/util/global-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceDataService {
  public deviceObject: any;
  public object: any;
  public branchName: any;
  public deviceID: any;
  public isBrowserMode: boolean = false;
  public valueToPass: boolean = true;

  constructor(
    private http: HttpClient,
    private errorHandler: GlobalErrorHandler
  ) {}

  postDeviceList(unitId: any): Observable<any> {
    let myObj = {
      type: 'CFM',
      name: 'GET_UNIT_INFO',
    };

    return this.http
      .post<any>(`/rest/dm/unitCommand/${unitId}`, myObj)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  syncDevice(id: any): Observable<any> {
    let myObj = {
      type: 'CFM',
      name: 'SYNC_DEVICE_LOG',
    };

    return this.http
      .post<any>(`/rest/dm/unitEvent/${id}`, myObj)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  clearLogs(id: any): Observable<any> {
    let myObj = {
      type: 'CFM',
      name: 'CLEAR_DEVICE_LOG',
    };

    return this.http
      .post<any>(`/rest/dm/unitEvent/${id}`, myObj)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  updateDevice(device: IDevice): Observable<any> {

    const BranchPrefix = device.unitInfo?.appInfo?.unitId?.slice(0,3);
    const UnitID = device.unitInfo?.appInfo?.unitId?.slice(4);
    const id = device.unitId;

    if (this.isBrowserMode) {
      this.object = {
        type: 'CFM',
        parameters: {
          UPGRADE_STATUS: device.unitInfo?.appInfo?.upgradeStatus,
          UPGRADE_TIME: device.unitInfo?.appInfo?.upgradeTime,
          SYSTEM: device.unitInfo?.appInfo?.systemType,
          LOG_LEVEL: device.unitInfo?.appInfo?.logLevel,
          PORT: 8080,
          BRANCH_PREFIX: BranchPrefix,
          UNIT_ID: UnitID,
          UPDATE_UNIT_ID: device.isUpdateUnitId,
        },
        name: 'UPDATE_DEVICE_SETTINGS',
      };
    } else {
      this.object = {
        type: 'CFM',
        parameters: {
          UPGRADE_STATUS: device.unitInfo?.appInfo?.upgradeStatus,
          UPGRADE_TIME: device.unitInfo?.appInfo?.upgradeTime,
          SYSTEM: device.unitInfo?.appInfo?.systemType,
          LOG_LEVEL: device.unitInfo?.appInfo?.logLevel,
          BRANCH_PREFIX: BranchPrefix,
          UNIT_ID: UnitID,
          UPDATE_UNIT_ID: device.isUpdateUnitId,
        },
        name: 'UPDATE_DEVICE_SETTINGS',
      };
    }

    return this.http
      .post<any>(`/rest/dm/unitEvent/${id}`, this.object, {
        observe: 'response',
      })
      .pipe(
        tap((response: { status: any }) => {}),
        catchError((error) => {
          return throwError({ error, deviceResponse: device });
        })
      );
  }

  updateDeviceLocal(device: IDevice): Observable<any> {
    const BranchPrefix = device.unitName?.slice(0, 3);
    const id = device.unitId;
    const UnitID = device.unitName?.slice(4);

    const ip = device.unitInfo?.appInfo?.ipAddress;

    if (device.unitInfo?.appInfo?.port == undefined) {
      this.deviceObject = {
        UPGRADE_STATUS: device.unitInfo?.appInfo?.upgradeStatus,
        UPGRADE_TIME: device.unitInfo?.appInfo?.upgradeTime,
        SYSTEM: device.unitInfo?.appInfo?.systemType,
        LOG_LEVEL: device.unitInfo?.appInfo?.logLevel,
        HOST: device.unitInfo?.appInfo?.host,
        WS_PORT: device.unitInfo?.appInfo?.wsPort,
        ORIGIN: device.unitInfo?.appInfo?.origin,
        BRANCH_PREFIX: BranchPrefix,
        UNIT_ID: UnitID,
        IS_SSL: false,
      };
    } else {
      this.deviceObject = {
        UPGRADE_STATUS: device.unitInfo?.appInfo?.upgradeStatus,
        UPGRADE_TIME: device.unitInfo?.appInfo?.upgradeTime,
        SYSTEM: device.unitInfo?.appInfo?.systemType,
        LOG_LEVEL: device.unitInfo?.appInfo?.logLevel,
        HOST: device.unitInfo?.appInfo?.host,
        PORT: device.unitInfo?.appInfo?.port,
        ORIGIN: device.unitInfo?.appInfo?.origin,
        BRANCH_PREFIX: BranchPrefix,
        UNIT_ID: UnitID,
        IS_SSL: false,
      };
    }

    let params = new HttpParams();
    const timestamp = new Date().getTime();
    params = params.set('timestamp', timestamp.toString());

    const url = `http://${ip}:9595/updateSetting`;
    const urlWithParams = `${url}?${params.toString()}`;

    return this.http
      .post<any>(urlWithParams, JSON.stringify(this.deviceObject), {
        observe: 'response',
      })
      .pipe(
        tap((response: { status: any }) => {}),
        catchError((error) => {
          return throwError({ error, deviceResponse: device });
        })
      );
  }

  upgradePin(id: any, pin: any): Observable<any> {
    let myObj = {
      type: 'CFM',
      parameters: {
        PIN: pin,
      },
      name: 'UPDATE_DEVICE_SETTINGS',
    };

    return this.http
      .post<any>(`/rest/dm/unitEvent/${id}`, myObj)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  upgradePinLocal(pin: any): Observable<any> {
    let myObj = {
      PIN: pin,
    };

    return this.http
      .post<any>(`http://10.20.1.230:9595/updateSetting`, myObj)
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
