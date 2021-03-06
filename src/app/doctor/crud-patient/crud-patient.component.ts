import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Patient } from 'src/app/models/patient';
import { PatientAux } from 'src/app/models/patientaux';
import { UserLogIn } from 'src/app/models/userLogIn';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-crud-patient',
  templateUrl: './crud-patient.component.html',
  styleUrls: ['./crud-patient.component.scss']
})
export class CrudPatientComponent implements OnInit {

  patients: PatientAux[];

  genders: string[] = ["Female","Male","Other"];
  loginDto: UserLogIn;

  editingCat: PatientAux;
  deleteCat: Patient;

  pageOfAnswers: Patient[];
  itemsOnPage: number = 12;
  currentPosition: number = 0;
  numberOfPages: number = 0;
  newCat: Patient = new Patient();

  modalRef: BsModalRef;

  constructor(private doctorService: DoctorService,
    private router: Router,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void{
    if (sessionStorage.getItem('role') == 'DOCTOR'){
      this.getPatients();
      this.newCat.id = '';
      this.newCat.name = '';
      this.newCat.birthDate = '';
      this.newCat.gender = '';
      this.newCat.address = '';
      this.newCat.medicalRecord = '';
      this.newCat.doctorId = sessionStorage.getItem('clientId');
    }else{
      this.router.navigateByUrl('/404');
    }
  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(template);  
  }

  openModalEdit(template: TemplateRef<any>, cat: PatientAux) {

    this.editingCat = {
      id: cat.id,
      name: cat.name,
      birthDate: cat.birthDate,
      gender: cat.gender,
      address: cat.address,
      medicalRecord: cat.medicalRecord,
      doctorId: sessionStorage.getItem('clientId'),
      caregiverId: cat.caregiverId
    };
    this.modalRef = this.modalService.show(template);
  }

  openModalAccount(template: TemplateRef<any>, cat: PatientAux) {

    this.doctorService.getPatientAccount(cat.id).subscribe(
      (res) => {
        this.loginDto=res;
      }
    )

    this.modalRef = this.modalService.show(template);
  }

  openModalDelete(template: TemplateRef<any>, cat: Patient) {
    this.deleteCat = cat;
    this.modalRef = this.modalService.show(template);
  }

  getPatients(): void {
    this.doctorService.getAllPatients().subscribe(
      (res) => {
        this.patients = res;
          this.numberOfPages = Math.ceil(
            this.patients.length / this.itemsOnPage
          );
          this.populatePage();
      }
    );
  }

  populatePage() {
    this.pageOfAnswers = this.patients.slice(
      this.currentPosition,
      this.currentPosition + this.itemsOnPage
    );
  }

  changePage(goForward: boolean): void {
    if (
      (!goForward && this.currentPosition === 0) ||
      (goForward &&
        (this.currentPosition + this.itemsOnPage) / this.itemsOnPage ==
          this.numberOfPages)
    ) {
      this.router.navigateByUrl('doctor/crud-patient');
      return;
    }

    if (goForward) this.currentPosition += this.itemsOnPage;
    else this.currentPosition -= this.itemsOnPage;

    this.populatePage();
  }

  addPatient(patient: Patient) {
    console.log(patient);
    this.doctorService.addPatient(patient).subscribe(
      () => {
        this.getPatients();
        this.modalRef.hide();
        this.newCat = new Patient();
        this.newCat.doctorId = sessionStorage.getItem('clientId');
      }
    );
  }

  updatePatient(patient: PatientAux) {
      this.doctorService.updatePatient(patient).subscribe(
        () => {
          this.getPatients();
        }
      );
      this.getPatients();
  }

  deletePatient(patient: Patient) {
    this.doctorService.deletePatient(patient.id).subscribe(
      () => {
        this.getPatients();
        this.modalRef.hide();
      }
    );
  }

}
