import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UtilHelper } from 'src/app/util/unit-helper';
import {
  BranchDispatchers,
  BranchSelectors,
  DeviceDataService,
  SystemInfoSelectors,
  UserSelectors,
} from '../../../../store';
import { APP_URL, LOGOUT_URL } from './header-navigation';
import { IBranchModel } from 'src/models/IBranch';

@Component({
  selector: 'app-qm-header',
  templateUrl: './qm-header.component.html',
  styleUrls: ['./qm-header.component.scss'],
})
export class QmHeaderComponent implements OnInit {
  public brandLogoSrc = 'images/brand_logo_header.png';
  public brandLogoLightSrc = './images/brand_logo_light.png';
  private subscriptions: Subscription = new Subscription();
  userDirection$!: Observable<string>;
  public isRtl!: boolean;
  public userFullName$!: Observable<string>;
  public isDarkHeader: boolean = false;
  public isVisitManager: boolean = false;
  public portalUrl: string = '';
  public homeUrl: string = '';
  public targetPage: string = '';
  public productVersion: string = '';
  public VISIT_MANAGER_SUPPORTED: string = '4.4.0.152';
  public isPreventHeaderNavigations: boolean = false;
  public selectedBranch!: IBranchModel;
  public branch!: string;
  public selectedBranch$: any;

  constructor(
    private userSelectors: UserSelectors,
    private systemInfoSelectors: SystemInfoSelectors,
    private utilHelper: UtilHelper,
    private deviceDataService: DeviceDataService,
    private branchSelectors: BranchSelectors,
    private branchDispatcher: BranchDispatchers,
    private router: Router
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.userFullName$ = this.userSelectors.userFullName$;
    this.selectedBranch$ = this.branchSelectors.selectedBranch$;
  }

  ngOnInit() {
    this.setRtlStyles();

    const branchSubscription = this.selectedBranch$.subscribe((branch: any) => {
      this.selectedBranch = branch;
      console.log('branch:',branch);

      this.branch = branch;
    });
    this.subscriptions.add(branchSubscription);

    const visitManagerSubscriptions =
      this.systemInfoSelectors.isVisitManager$.subscribe((val) => {
        this.isVisitManager = val;
        // Commented until dark and light headers are enabled as a feature
        // this.isDarkHeader = val == true ? false : true;
      });
    this.subscriptions.add(visitManagerSubscriptions);

    const productVersionSubscription =
      this.systemInfoSelectors.systemInfoProductVersion$.subscribe(
        (productVersion) => {
          this.productVersion = productVersion;
        }
      );
    this.subscriptions.add(productVersionSubscription);

    const portalUrlSubscription = this.systemInfoSelectors.portalUrl$.subscribe(
      (portalUrl) => {
        if (portalUrl != null && portalUrl != undefined) {
          this.portalUrl = portalUrl;
        }
      }
    );
    this.subscriptions.add(portalUrlSubscription);
  }

  navigateToGridView() {
    this.isPreventHeaderNavigations = true;
   // this.branchDispatcher.selectedBranch(this.deviceDataService.branchName);
  }

  navigateToDeviceList() {
    this.isPreventHeaderNavigations = false;
  }

  setRtlStyles() {
    const userDirectionSubscription = this.userDirection$.subscribe((data) => {
      if (data === 'rtl') {
        this.isRtl = true;
      } else {
        this.isRtl = false;
      }
    });
    this.subscriptions.add(userDirectionSubscription);
  }

  homeClick(event: any) {
    event.preventDefault();
    window.location.href = APP_URL;
  }

  logout(event: Event) {
    event.preventDefault();
    window.location.href = LOGOUT_URL;
  }

  redirectURL() {
    if (
      this.utilHelper.compareVersions(
        this.productVersion,
        this.VISIT_MANAGER_SUPPORTED
      ) == -1
    ) {
      this.homeUrl = '/';
    } else {
      this.homeUrl = this.portalUrl !== '' ? this.portalUrl : '/';
    }

    if (this.homeUrl !== '/') {
      this.targetPage = '_blank';
    }
  }
}
