import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmDeviceListComponent } from './qm-device-list.component';

describe('QmDeviceListComponent', () => {
  let component: QmDeviceListComponent;
  let fixture: ComponentFixture<QmDeviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmDeviceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmDeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
