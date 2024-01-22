import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmSettingsAdminModalComponent } from './qm-settings-admin-modal.component';

describe('QmSettingsAdminModalComponent', () => {
  let component: QmSettingsAdminModalComponent;
  let fixture: ComponentFixture<QmSettingsAdminModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmSettingsAdminModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmSettingsAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
