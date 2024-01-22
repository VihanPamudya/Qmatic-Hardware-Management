import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmLoaderComponent } from './qm-loader.component';

describe('QmLoaderComponent', () => {
  let component: QmLoaderComponent;
  let fixture: ComponentFixture<QmLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
