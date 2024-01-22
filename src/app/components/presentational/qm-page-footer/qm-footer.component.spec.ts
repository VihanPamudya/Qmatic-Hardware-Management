import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmFooterComponent } from './qm-footer.component';

describe('QmFooterComponent', () => {
  let component: QmFooterComponent;
  let fixture: ComponentFixture<QmFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
