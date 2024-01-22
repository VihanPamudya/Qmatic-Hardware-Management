import { Component, OnDestroy, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {
  AccountDispatchers,
  SystemInfoDispatchers,
  SystemInfoSelectors,
} from '../store';
import { AccessModuleGuard } from 'src/routes/access-module-guard';
import { FormChangesService } from 'src/services/form-changes-service.service';
//import { CometDService } from 'src/services/util/qevents/comet-d.service';
import { CometDService } from 'src/services/cometDataFunctions/comet-d.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isFormChanged!: boolean;
  constructor(
    private router: Router,
    private systemInfoSelector: SystemInfoSelectors,
    private systemInfoDispatchers: SystemInfoDispatchers,
    private accountDispatchers: AccountDispatchers,
    private accessModuleGuard: AccessModuleGuard,
    private formChangesService: FormChangesService,
    private cometdService: CometDService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit() {
    this.cometdService.startConnection();
    this.systemInfoDispatchers.fetchSystemInfo();


    if (this.router.url === '/') {
      this.router.navigate(['/']);
    }
  }

  get accessApp() {
    return this.accessModuleGuard.isAccessApp;
  }

  @HostListener('unload', ['$event'])
  onUnload(event: Event): void {
    this.localStorageService.removeItem('deviceIds');
  }


  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.isFormChanged = this.formChangesService.getFormChanged();
    if (this.isFormChanged) {
      event.preventDefault();
      event.returnValue = false;
    }
  }


}
