import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmDeviceGridViewComponent } from './qm-device-grid-view.component';

describe('QmDeviceGridViewComponent', () => {
  let component: QmDeviceGridViewComponent;
  let fixture: ComponentFixture<QmDeviceGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmDeviceGridViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmDeviceGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
