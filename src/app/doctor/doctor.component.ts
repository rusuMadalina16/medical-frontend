import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { PatientAux } from '../models/patientaux';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  doctor: Doctor;
  patients: PatientAux[];

  constructor(private doctorService: DoctorService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void{
    if (sessionStorage.getItem('role')=='DOCTOR'){
      this.getDoctor();
      this.getPatients();
    }else{
      this.router.navigateByUrl('/404');
    }
  }

  getDoctor(): void{
    this.doctorService.getDoctorById(sessionStorage.getItem('clientId')).subscribe(
      (res) =>{
        this.doctor=res;
      }
    );
  }

  getPatients(): void{
    this.doctorService.getPatientsByDoctorId(sessionStorage.getItem('clientId')).subscribe(
      (res)=>{
        this.patients=res;
      }
    );
  }



}
