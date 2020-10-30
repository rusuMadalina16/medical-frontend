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
import { CaregiverComponent } from './caregiver/caregiver.component';
import { PatientComponent } from './patient/patient.component';
import { PersonalComponent } from './patient/personal/personal.component';
import { PlanComponent } from './patient/plan/plan.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';



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
    CarePatientComponent,
    CaregiverComponent,
    PatientComponent,
    PersonalComponent,
    PlanComponent,
    ErrorPageComponent,
    SignUpComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent
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
