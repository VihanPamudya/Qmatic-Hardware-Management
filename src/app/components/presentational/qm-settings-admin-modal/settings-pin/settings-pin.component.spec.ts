import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPinComponent } from './settings-pin.component';

describe('SettingsPinComponent', () => {
  let component: SettingsPinComponent;
  let fixture: ComponentFixture<SettingsPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
