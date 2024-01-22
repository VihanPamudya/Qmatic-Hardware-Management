import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmDeviceListTableComponent } from './qm-device-list-table.component';

describe('QmDeviceListTableComponent', () => {
  let component: QmDeviceListTableComponent;
  let fixture: ComponentFixture<QmDeviceListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmDeviceListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmDeviceListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
