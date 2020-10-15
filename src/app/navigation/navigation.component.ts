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

  constructor(private location: Location,
    private router:Router) { }

  ngOnInit(): void {
    this.checkDoc();
  }

  checkDoc(): void{
    if (this.location.path().includes("doctor")){
      this.userType="doctor";
    }
    if(this.location.path().includes("patient"))
    this.userType="patient";

    console.log(this.userType.includes("doctor"));
    console.log(this.userType.includes("patient"));
    console.log(this.userType);
    console.log(this.location.path());
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
}
