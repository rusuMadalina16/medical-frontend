import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Caregiver } from 'src/app/models/caregiver';
import { Medication } from 'src/app/models/medication';
import { Patient } from 'src/app/models/patient';
import { PatientAux } from 'src/app/models/patientaux';
import { Plan } from 'src/app/models/plan';
import { PlanAux } from 'src/app/models/planaux';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-care-patient',
  templateUrl: './care-patient.component.html',
  styleUrls: ['./care-patient.component.scss']
})
export class CarePatientComponent implements OnInit {
  firstInsert: boolean = true;
  selectedFinalPatient: boolean = false;
  selectedFinalCaregiver: boolean = false;
  modalRef: BsModalRef;

  finalPlans: PlanAux[] = [];
  finalFinalPlans: Plan[]=[];
  p: PatientAux;

  finalPatient: Patient;
  finalCaregiver: Caregiver;

  myControl = new FormControl();
  myControl2 = new FormControl();
  patients: Patient[];
  caregivers: Caregiver[];
  selectedCare: Caregiver;
  selectedPatient: string;
  options: string[] = [];
  options2: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;

  constructor(private doctorService: DoctorService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllCaregivers();
    this.selectedCare={
      id: "",
      name: "",
      birthDate: "",
      gender: "",
      address: ""
    };
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

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

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

  getAllCaregivers(): void{
    this.doctorService.getAllCarevigers().subscribe(
      (res) => {
        this.caregivers=res;
        for (let i=0; i<this.caregivers.length;i++){
          this.options.push(this.caregivers[i].name);
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

  selectCaregiver(): void{
    this.doctorService.getCaregiverByName(this.selectedCare.name).subscribe(
      (res) =>{
        this.caregivers=res;
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

  selectFinalCaregiver(caregiver: Caregiver): void{
    this.finalCaregiver=caregiver;
    this.selectedFinalCaregiver=true;
  }

  finish(): void{
    this.p = {
      id: this.finalPatient.id,
      name: this.finalPatient.name,
      birthDate: this.finalPatient.birthDate,
      gender: this.finalPatient.gender,
      address: this.finalPatient.address,
      medicalRecord: this.finalPatient.medicalRecord,
      doctorId: sessionStorage.getItem('clientId'),
      caregiverId: this.finalCaregiver.id
    };
    this.getAllPatients();
    this.getAllCaregivers();
    this.selectedFinalCaregiver=false;
    this.selectedFinalPatient=false;
    this.selectedCare={
      id: "",
      name: "",
      birthDate: "",
      gender: "",
      address: ""
    };
    this.selectedPatient="";
    this.doctorService.updatePatientCaregiver(this.p).subscribe(
      (res) => {
        console.log("Good job!!!");
      }
    );
  }

  disableFinish(): boolean {
    if(this.selectedFinalPatient && this.selectedFinalCaregiver){
      return false;
    }
    return true;
  }

}
