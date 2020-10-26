import { Component, OnInit } from '@angular/core';
import { PatientAux } from '../models/patientaux';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patient: PatientAux;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void{
    this.patientService.getPatientById(sessionStorage.getItem('clientId')).subscribe(
      (res) => {
        this.patient=res;
        sessionStorage.setItem('caregiverId',this.patient.caregiverId);
        sessionStorage.setItem('doctorId',this.patient.doctorId);
      }
    );
  }

}
