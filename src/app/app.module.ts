import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LogInComponent } from './log-in/log-in.component';
import { DoctorComponent } from './doctor/doctor.component';
import { CrudMedicationComponent } from './doctor/crud-medication/crud-medication.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudPatientComponent } from './doctor/crud-patient/crud-patient.component';
import { CrudCaregiverComponent } from './doctor/crud-caregiver/crud-caregiver.component';
import { MedicationPlanComponent } from './doctor/medication-plan/medication-plan.component';

import { MaterialModule } from './material.module';
import { CarePatientComponent } from './doctor/care-patient/care-patient.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LogInComponent,
    DoctorComponent,
    CrudMedicationComponent,
    CrudPatientComponent,
    CrudCaregiverComponent,
    MedicationPlanComponent,
    CarePatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
