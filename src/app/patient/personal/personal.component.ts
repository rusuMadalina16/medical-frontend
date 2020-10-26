import { Component, OnInit } from '@angular/core';
import { Caregiver } from 'src/app/models/caregiver';
import { Doctor } from 'src/app/models/doctor';
import { PatientAux } from 'src/app/models/patientaux';
import { PlanAux } from 'src/app/models/planaux';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  finalPlans: PlanAux[];
  caregiver: Caregiver;
  doctor: Doctor;
  patient: PatientAux;

  constructor(private doctorService: DoctorService,
    private patientService: PatientService) { }

  ngOnInit(): void {
    this.getDoctor();
    this.getCaregiver();
  }


  getCaregiver(): void{
    this.doctorService.getCaregiverById(sessionStorage.getItem('caregiverId')).subscribe(
      (res2) => {
        this.caregiver=res2;
      }
    );
  }

  getDoctor(): void {
    this.doctorService.getDoctorById(sessionStorage.getItem('doctorId')).subscribe(
      (res3) => {
        this.doctor=res3;
      }
    );
  }

}
