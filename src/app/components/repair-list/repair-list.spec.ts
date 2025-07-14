import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairList } from './repair-list';

describe('RepairList', () => {
  let component: RepairList;
  let fixture: ComponentFixture<RepairList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
