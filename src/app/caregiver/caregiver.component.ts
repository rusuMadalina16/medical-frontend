import { Component, OnInit } from '@angular/core';
import { Caregiver } from '../models/caregiver';
import { Patient } from '../models/patient';
import { CaregiverService } from '../services/caregiver.service';

@Component({
  selector: 'app-caregiver',
  templateUrl: './caregiver.component.html',
  styleUrls: ['./caregiver.component.scss']
})
export class CaregiverComponent implements OnInit {

  constructor(private caregiverService: CaregiverService) { }
  patients: Patient[];
  caregiver: Caregiver;

  ngOnInit(): void {
    this.getCaregiver();
    this.homePage();
  }

  homePage(): void{
    this.caregiverService.getPatientsByCaregiverId(sessionStorage.getItem('clientId')).subscribe(
      (res) => {
        this.patients=res;
      }
    );
  }

  getCaregiver(): void{
    this.caregiverService.getCaregiverById(sessionStorage.getItem('clientId')).subscribe(
      (res) => {
        this.caregiver=res;
      }
    );
  }
}
