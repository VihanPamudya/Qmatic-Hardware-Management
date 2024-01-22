import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUnitInfoComponent } from './settings-unit-info.component';

describe('SettingsUnitInfoComponent', () => {
  let component: SettingsUnitInfoComponent;
  let fixture: ComponentFixture<SettingsUnitInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsUnitInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsUnitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
