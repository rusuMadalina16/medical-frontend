import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Medication } from 'src/app/models/medication';
import { Patient } from 'src/app/models/patient';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-medication-plan',
  templateUrl: './medication-plan.component.html',
  styleUrls: ['./medication-plan.component.scss']
})
export class MedicationPlanComponent implements OnInit {

  myControl = new FormControl();
  myControl2 = new FormControl();
  patients: Patient[];
  medications: Medication[];
  selectedMed: string;
  selectedPatient: string;
  options: string[] = [];
  options2: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllMeds();
    this.selectedMed="";
    this.selectedPatient="";
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value))
    );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter2(value2: string): string[] {
    const filterValue2 = value2.toLowerCase();

    return this.options2.filter(option2 => option2.toLowerCase().indexOf(filterValue2) === 0);
  }

  getAllPatients(): void{
    this.doctorService.getAllPatients().subscribe(
      (res) => {
        this.patients=res;
        for (let i=0; i<this.patients.length;i++){
          this.options2.push(this.patients[i].name);
        }
      }
    )
  }

  getAllMeds(): void{
    this.doctorService.getAllMedication().subscribe(
      (res) => {
        this.medications=res;
        for (let i=0; i<this.medications.length;i++){
          this.options.push(this.medications[i].name);
        }
      }
    )
  }
}
