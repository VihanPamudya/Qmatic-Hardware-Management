import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLogsComponent } from './settings-logs.component';

describe('SettingsLogsComponent', () => {
  let component: SettingsLogsComponent;
  let fixture: ComponentFixture<SettingsLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
