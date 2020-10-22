import { Component, OnInit } from '@angular/core';
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

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctor();
    this.getPatients();
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
