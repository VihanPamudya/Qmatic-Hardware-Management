import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAutomaticUpgradeComponent } from './settings-automatic-upgrade.component';

describe('SettingsAutomaticUpgradeComponent', () => {
  let component: SettingsAutomaticUpgradeComponent;
  let fixture: ComponentFixture<SettingsAutomaticUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAutomaticUpgradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsAutomaticUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
