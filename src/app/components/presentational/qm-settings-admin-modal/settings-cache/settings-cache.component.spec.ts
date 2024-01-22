import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCacheComponent } from './settings-cache.component';

describe('SettingsCacheComponent', () => {
  let component: SettingsCacheComponent;
  let fixture: ComponentFixture<SettingsCacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsCacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
