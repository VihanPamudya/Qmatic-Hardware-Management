import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmBranchListComponent } from './qm-branch-list.component';

describe('QmBranchListComponent', () => {
  let component: QmBranchListComponent;
  let fixture: ComponentFixture<QmBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmBranchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
