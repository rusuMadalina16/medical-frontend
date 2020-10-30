import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Medication } from 'src/app/models/medication';
import { DoctorService } from 'src/app/services/doctor.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';  

@Component({
  selector: 'app-crud-medication',
  templateUrl: './crud-medication.component.html',
  styleUrls: ['./crud-medication.component.scss']
})
export class CrudMedicationComponent implements OnInit {

  medications: Medication[];

  editingCat: Medication;
  deleteCat: Medication;

  pageOfAnswers: Medication[];
  itemsOnPage: number = 12;
  currentPosition: number = 0;
  numberOfPages: number = 0;
  newCat: Medication = new Medication();

  modalRef: BsModalRef;

  constructor(private doctorService: DoctorService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void{
    if (sessionStorage.getItem('role')=='DOCTOR'){
      this.getMedications();
      this.newCat.id = '';
      this.newCat.sideEffects = '';
      this.newCat.dosage = '';
    }else{
      this.router.navigateByUrl('/404');
    }
  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(template);  
  }

  openModalEdit(template: TemplateRef<any>, cat: Medication) {

    this.editingCat = {
      id: cat.id,
      name: cat.name,
      dosage: cat.dosage,
      sideEffects: cat.sideEffects
    };
    this.modalRef = this.modalService.show(template);
  }

  openModalDelete(template: TemplateRef<any>, cat: Medication) {
    this.deleteCat = cat;
    this.modalRef = this.modalService.show(template);
  }

  getMedications(): void {
    this.doctorService.getAllMedication().subscribe(
      (res) => {
        this.medications = res;
          this.numberOfPages = Math.ceil(
            this.medications.length / this.itemsOnPage
          );
          this.populatePage();
      }
    );
  }

  populatePage() {
    this.pageOfAnswers = this.medications.slice(
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
      this.router.navigateByUrl('doctor/crud-medication');
      return;
    }

    if (goForward) this.currentPosition += this.itemsOnPage;
    else this.currentPosition -= this.itemsOnPage;

    this.populatePage();
  }

  addMedication(medication: Medication) {
    console.log(medication);
    this.doctorService.addMedication(medication).subscribe(
      () => {
        this.getMedications();
        this.modalRef.hide();
        this.newCat = new Medication();
      }
    );
  }

  updateMedication(medication: Medication) {
      this.doctorService.updateMedication(medication).subscribe(
        () => {
          this.getMedications();
        }
      );
      this.getMedications();
  }

  deleteMedication(medication: Medication) {
    this.doctorService.deleteMedication(medication.id).subscribe(
      () => {
        this.getMedications();
        this.modalRef.hide();
      }
    );
  }

}
