import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Caregiver } from 'src/app/models/caregiver';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-crud-caregiver',
  templateUrl: './crud-caregiver.component.html',
  styleUrls: ['./crud-caregiver.component.scss']
})
export class CrudCaregiverComponent implements OnInit {

  caregivers: Caregiver[];

  genders: string[] = ["Female","Male","Other"];

  editingCat: Caregiver;
  deleteCat: Caregiver;

  pageOfAnswers: Caregiver[];
  itemsOnPage: number = 12;
  currentPosition: number = 0;
  numberOfPages: number = 0;
  newCat: Caregiver = new Caregiver();

  modalRef: BsModalRef;

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getCaregivers();
    this.newCat.id = '';
    this.newCat.name = '';
    this.newCat.birthDate = '';
    this.newCat.gender = '';
    this.newCat.address = '';
  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(template);  
  }

  openModalEdit(template: TemplateRef<any>, cat: Caregiver) {

    this.editingCat = {
      id: cat.id,
      name: cat.name,
      birthDate: cat.birthDate,
      gender: cat.gender,
      address: cat.address
    };
    this.modalRef = this.modalService.show(template);
  }

  openModalDelete(template: TemplateRef<any>, cat: Caregiver) {
    this.deleteCat = cat;
    this.modalRef = this.modalService.show(template);
  }

  getCaregivers(): void {
    this.doctorService.getAllCarevigers().subscribe(
      (res) => {
        this.caregivers = res;
          this.numberOfPages = Math.ceil(
            this.caregivers.length / this.itemsOnPage
          );
          this.populatePage();
      }
    );
  }

  populatePage() {
    this.pageOfAnswers = this.caregivers.slice(
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
      this.router.navigateByUrl('doctor/crud-caregiver');
      return;
    }

    if (goForward) this.currentPosition += this.itemsOnPage;
    else this.currentPosition -= this.itemsOnPage;

    this.populatePage();
  }

  addCaregiver(caregiver: Caregiver) {
    console.log(caregiver);
    this.doctorService.addCaregiver(caregiver).subscribe(
      () => {
        this.getCaregivers();
        this.modalRef.hide();
        this.newCat = new Caregiver();
      }
    );
  }

  updateCaregiver(caregiver: Caregiver) {
      this.doctorService.updateCaregiver(caregiver).subscribe(
        () => {
          this.getCaregivers();
        }
      );
      this.getCaregivers();
  }

  deleteCaregiver(caregiver: Caregiver) {
    this.doctorService.deleteCaregiver(caregiver.id).subscribe(
      () => {
        this.getCaregivers();
        this.modalRef.hide();
      }
    );
  }
}
