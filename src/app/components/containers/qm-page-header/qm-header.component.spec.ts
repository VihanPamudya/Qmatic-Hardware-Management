import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmHeaderComponent } from './qm-header.component';

describe('QmHeaderComponent', () => {
  let component: QmHeaderComponent;
  let fixture: ComponentFixture<QmHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
