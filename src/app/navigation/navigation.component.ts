import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  userType:string = "none";
  location: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.checkDoc();
  }

  checkDoc(): void{
    this.router.events.subscribe((params) => {
      sessionStorage.setItem("navBar",sessionStorage.getItem("role"));
      this.userType = sessionStorage.getItem("navBar");
    })
    this.userType = sessionStorage.getItem("navBar");
    if(sessionStorage.getItem("navBar") == "null"){
      this.router.navigateByUrl("");
    }

    this.location=this.router.url;

    console.log(this.userType);
  }

  btnClick(): void{
    this.router.navigateByUrl("/log-in");
  }

  btnClickCrudMed(): void{
    this.router.navigateByUrl("/doctor/crud-medication");
  }
  btnClickCrudPat(): void{
    this.router.navigateByUrl("/doctor/crud-patient");
  }
  btnClickCrudCar(): void{
    this.router.navigateByUrl("/doctor/crud-caregiver");
  }
  btnClickPlanMed(): void{
    this.router.navigateByUrl("/doctor/plan-medication");
  }
  btnClickCarePat(): void{
    this.router.navigateByUrl("/doctor/caregiver-patient");
  }
  btnClickCareHome(): void{
    this.router.navigateByUrl("/doctor");
  }

  btnClickCaregiverHome(): void{
    this.router.navigateByUrl("/caregiver");
  }

  btnClickPatientHome(): void{
    this.router.navigateByUrl("/patient");
  }
  
  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl("");
  }
}
