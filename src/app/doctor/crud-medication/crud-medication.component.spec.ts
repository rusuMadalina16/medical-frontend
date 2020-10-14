import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMedicationComponent } from './crud-medication.component';

describe('CrudMedicationComponent', () => {
  let component: CrudMedicationComponent;
  let fixture: ComponentFixture<CrudMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudMedicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
