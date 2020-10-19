import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationPlanComponent } from './medication-plan.component';

describe('MedicationPlanComponent', () => {
  let component: MedicationPlanComponent;
  let fixture: ComponentFixture<MedicationPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
