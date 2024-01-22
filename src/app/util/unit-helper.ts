import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/models/IUser';

@Injectable()
export class UtilHelper {
  constructor() {}

  compareVersions(baseVersion: any, currentVersion: any) {
    var a = baseVersion.split('.'),
      b = currentVersion.split('.'),
      i = 0,
      len = Math.max(a.length, b.length);

    for (; i < len; i++) {
      if (
        (a[i] && !b[i] && parseInt(a[i]) > 0) ||
        parseInt(a[i]) > parseInt(b[i])
      ) {
        return 1;
      } else if (
        (b[i] && !a[i] && parseInt(b[i]) > 0) ||
        parseInt(a[i]) < parseInt(b[i])
      ) {
        return -1;
      }
    }
    return 0;
  }
}
