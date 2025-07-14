import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsDashboard } from './repairs-dashboard';

describe('RepairsDashboard', () => {
  let component: RepairsDashboard;
  let fixture: ComponentFixture<RepairsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
