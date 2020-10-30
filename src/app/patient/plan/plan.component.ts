import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullDetailPlan } from 'src/app/models/fulldetailplan';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  planss: FullDetailPlan[];

  constructor(private patientService: PatientService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void{
    if (sessionStorage.getItem('role')=='PATIENT'){
      this.getPlans();
    }else{
      this.router.navigateByUrl('/404');
    }
  }

  getPlans(): void{
    this.patientService.getPlans(sessionStorage.getItem('clientId')).subscribe(
      (res) => {
        this.planss=res;
      }
    );
  }

}
