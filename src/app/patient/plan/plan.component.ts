import { Component, OnInit } from '@angular/core';
import { FullDetailPlan } from 'src/app/models/fulldetailplan';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  planss: FullDetailPlan[];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans(): void{
    this.patientService.getPlans(sessionStorage.getItem('clientId')).subscribe(
      (res) => {
        this.planss=res;
      }
    );
  }

}
