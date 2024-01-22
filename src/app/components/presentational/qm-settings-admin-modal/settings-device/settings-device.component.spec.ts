import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDeviceComponent } from './settings-device.component';

describe('SettingsDeviceComponent', () => {
  let component: SettingsDeviceComponent;
  let fixture: ComponentFixture<SettingsDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
