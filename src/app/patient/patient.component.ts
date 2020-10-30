import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientAux } from '../models/patientaux';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patient: PatientAux;

  constructor(private patientService: PatientService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void{
    if (sessionStorage.getItem('role')=='PATIENT'){
      this.getPatient();
    }else{
      this.router.navigateByUrl('/404');
    }
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
