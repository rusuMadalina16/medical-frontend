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
    this.getMedications();
  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );  
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
        this.loadCategories();
        this.modalRef.hide();
        this.newCat = new Medication();
      }
    );
  }

  loadCategories(): void {
    this.doctorService.getAllMedication().subscribe(
      (res) => {
        this.medications = res;
      }
    );
  }

}
