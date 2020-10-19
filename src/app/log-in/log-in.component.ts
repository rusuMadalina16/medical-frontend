import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caregiver } from '../models/caregiver';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { User } from '../models/user';
import { UserLogIn } from '../models/userLogIn';
import { DoctorService } from '../services/doctor.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  user: User;
  userLogIn: UserLogIn;
  doctor: Doctor;
  patient: Patient;
  caregiver: Caregiver;

  constructor(private router: Router,
    private loginService: LoginService,
    private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.scrollThing();
    this.userLogIn = {
      username: "",
      password: ""
    };
    this.user = {
      id: "",
      role: "",
      clientId: ""
    }
  }

  scrollThing(): void {
    window.onscroll = function () { myFunction() };
    var navbar = document.getElementById("navbar");
    var serviceWrapper = document.getElementById("service-wrapper")
    var sticky = navbar.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        serviceWrapper.classList.add("service-stick-mode");
      } else {
        navbar.classList.remove("sticky");
        serviceWrapper.classList.remove("service-stick-mode");
      }
    }
  }

  btnClick(): void {
    this.router.navigateByUrl('/log-in');
  };

  getUser(): void {
    this.loginService.logIn(this.userLogIn.username,this.userLogIn.password).subscribe(
      (res) => {
        this.user = res;
      }
    );

    if (this.user.role == 'DOCTOR') {
      this.doctorService.getDoctorById(this.user.id).subscribe(
        (res) => {
          this.doctor = res;
          sessionStorage.clear();
          sessionStorage.setItem('userId', this.user.id);
          sessionStorage.setItem('role', this.user.role);
          sessionStorage.setItem('clientId', this.user.clientId);
          sessionStorage.setItem('name', this.doctor.name);
          sessionStorage.setItem('birthDate', this.doctor.birthDate);
          sessionStorage.setItem('gender', this.doctor.gender);
          sessionStorage.setItem('address', this.doctor.address);
          this.router.navigateByUrl('/doctor');
        }
      );
    }

    if (this.user.role == 'PATIENT') {
      this.doctorService.getPatientById(this.user.id).subscribe(
        (res) => {
          this.patient = res;
          sessionStorage.clear();
          sessionStorage.setItem('userId', this.user.id);
          sessionStorage.setItem('role', this.user.role);
          sessionStorage.setItem('clientId', this.user.clientId);
          sessionStorage.setItem('name', this.patient.name);
          sessionStorage.setItem('birthDate', this.patient.birthDate);
          sessionStorage.setItem('gender', this.patient.gender);
          sessionStorage.setItem('address', this.patient.address);
          sessionStorage.setItem('medicalRecord', this.patient.medicalRecord);
        }
      );
    }

    if (this.user.role == 'CAREGIVER') {
      this.doctorService.getCaregiverById(this.user.id).subscribe(
        (res) => {
          this.doctor = res;
          sessionStorage.clear();
          sessionStorage.setItem('userId', this.user.id);
          sessionStorage.setItem('role', this.user.role);
          sessionStorage.setItem('clientId', this.user.clientId);
          sessionStorage.setItem('name', this.caregiver.name);
          sessionStorage.setItem('birthDate', this.caregiver.birthDate);
          sessionStorage.setItem('gender', this.caregiver.gender);
          sessionStorage.setItem('address', this.caregiver.address);
        }
      );
    }
  }

}
