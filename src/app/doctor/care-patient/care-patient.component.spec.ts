import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePatientComponent } from './care-patient.component';

describe('CarePatientComponent', () => {
  let component: CarePatientComponent;
  let fixture: ComponentFixture<CarePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
