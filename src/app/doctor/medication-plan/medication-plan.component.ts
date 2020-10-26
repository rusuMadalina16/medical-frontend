import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Medication } from 'src/app/models/medication';
import { Patient } from 'src/app/models/patient';
import { Plan } from 'src/app/models/plan';
import { PlanAux } from 'src/app/models/planaux';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-medication-plan',
  templateUrl: './medication-plan.component.html',
  styleUrls: ['./medication-plan.component.scss']
})
export class MedicationPlanComponent implements OnInit {

  firstInsert: boolean = true;
  selectedFinalPatient: boolean = false;
  modalRef: BsModalRef;

  finalPlans: PlanAux[] = [];
  ffinalPPlans: PlanAux[];
  finalFinalPlans: Plan[]=[];
  p: PlanAux;
  pp: Plan;
  inter: string[] = [
    "Morning",
    "Evening",
    "Noon",
    "Night",
    "Morning, Evening",
    "Morning, Night",
    "Morning, Noon",
    "Evening, Night",
    "Evening, Noon",
    "Night, Noon",
    "Morning, Noon, Evening",
    "Morning, Noon, Night",
    "Morning, Evening, Night",
    "Noon, Evening, Night",
    "Morning, Noon, Evening, Night"
  ];

  finalPatient: Patient;
  finalListMeds: Medication[];

  myControl = new FormControl();
  myControl2 = new FormControl();
  patients: Patient[];
  medications: Medication[];
  selectedMed: Medication;
  selectedPatient: string;
  options: Medication[] = [];
  options2: string[] = [];
  filteredOptions: Observable<Medication[]>;
  filteredOptions2: Observable<string[]>;

  constructor(private doctorService: DoctorService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllMeds();
    this.selectedMed={
      id: "",
      name: "",
      dosage: "",
      sideEffects: ""
    };
    this.selectedPatient="";
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value))
    );
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );

  }

  private _filter(name: string): Medication[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter2(value2: string): string[] {
    const filterValue2 = value2.toLowerCase();

    return this.options2.filter(option2 => option2.toLowerCase().indexOf(filterValue2) === 0);
  }

  getAllPatients(): void{
    this.doctorService.getAllPatients().subscribe(
      (res) => {
        this.patients=res;
        if (this.options2.length === 0){
        for (let i=0; i<this.patients.length;i++){
          this.options2.push(this.patients[i].name);
        }
      }
      }
    )
  }

  getAllMeds(): void{
    this.doctorService.getAllMedication().subscribe(
      (res) => {
        this.medications=res;
        if (this.options.length === 0){
        for (let i=0; i<this.medications.length;i++){
          this.options.push(this.medications[i]);
        }
      }
      }
    );
  }

  selectPatient(): void{
    this.doctorService.getPatientByName(this.selectedPatient).subscribe(
      (res) =>{
        this.patients=res;
      }
    );
  }

  selectMed(): void{
    this.doctorService.getMedByName(this.selectedMed.name).subscribe(
      (res) =>{
       // console.log(res);
        if (this.firstInsert){
          this.firstInsert=false;
          this.medications = res;

          this.p={
            idMedication:this.medications[0].id,
            dosage: this.medications[0].dosage,
            sideEffects: this.medications[0].sideEffects,
            name: this.medications[0].name,
            doctorDosage: "",
            dataStart: "",
            dataStop: "",
            interval: ""
          };
          this.finalPlans.push(this.p);

        }else{
          this.medications.push(res[0]);
          this.p={
            idMedication:this.medications[this.medications.length-1].id,
            dosage: this.medications[this.medications.length-1].dosage,
            sideEffects: this.medications[this.medications.length-1].sideEffects,
            name: this.medications[this.medications.length-1].name,
            doctorDosage: "",
            dataStart: "",
            dataStop: "",
            interval: ""
          };
          this.finalPlans.push(this.p);
        }
        console.log(this.finalPlans);
      }
    );
  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(template);  
  }

  selectFinalPatient(patient: Patient): void{
    this.finalPatient=patient;
    this.selectedFinalPatient=true;
  }

  finish(): void{
    for(let i=0; i<this.finalPlans.length;i++){
      //console.log(this.finalPlans[i]); sessionStorage.getItem('clientId')
      this.pp={
        id: "",
        dataStart: this.finalPlans[i].dataStart,
        dataStop: this.finalPlans[i].dataStop,
        doctorDosage: this.finalPlans[i].doctorDosage,
        idMedication: this.finalPlans[i].idMedication,
        idPatient: this.finalPatient.id,
        interval: this.finalPlans[i].interval
      };

      this.doctorService.addPlan(this.pp).subscribe(
        (res) =>{
          console.log("Good Job!!!");
          this.getAllPatients();
          this.getAllMeds();
        }
      );

    }
    this.selectedMed={
      id: "",
      name: "",
      dosage: "",
      sideEffects: ""
    };
    this.selectedPatient="";
    this.selectedFinalPatient=false;
    this.ffinalPPlans = [];
    for (let i = 0; i < this.finalPlans.length; i++) {
      this.ffinalPPlans.push(this.finalPlans[i]);
    }
    this.finalPlans=[];

  }

  disableFinish(): boolean {
    let ds = this.finalPlans.filter(o => o.dataStart !== "").length;
    let dstop = this.finalPlans.filter(o => o.dataStop !== "").length;
    let dos = this.finalPlans.filter(o => o.doctorDosage !== "").length;
    if(this.finalPatient !== null && this.finalPlans.length !== 0
      && ds === this.finalPlans.length && dstop === this.finalPlans.length
      && dos === this.finalPlans.length){
      return false;
    }
    return true;
  }

}
