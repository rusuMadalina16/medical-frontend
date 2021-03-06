import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaregiverComponent } from './caregiver/caregiver.component';
import { ContactComponent } from './contact/contact.component';
import { CarePatientComponent } from './doctor/care-patient/care-patient.component';
import { CrudCaregiverComponent } from './doctor/crud-caregiver/crud-caregiver.component';
import { CrudMedicationComponent } from './doctor/crud-medication/crud-medication.component';
import { CrudPatientComponent } from './doctor/crud-patient/crud-patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { MedicationPlanComponent } from './doctor/medication-plan/medication-plan.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { PatientComponent } from './patient/patient.component';
import { PersonalComponent } from './patient/personal/personal.component';
import { PlanComponent } from './patient/plan/plan.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: "log-in",
    component: LogInComponent
  },
  {
    path: "doctor",
    component: DoctorComponent
  },
  {
    path: "doctor/crud-medication",
    component: CrudMedicationComponent
  },
  {
    path: "doctor/crud-patient",
    component: CrudPatientComponent
  },
  {
    path: "doctor/crud-caregiver",
    component: CrudCaregiverComponent
  },
  {
    path: "doctor/plan-medication",
    component: MedicationPlanComponent
  },
  {
    path: "doctor/caregiver-patient",
    component: CarePatientComponent
  },
  {
    path: "caregiver",
    component: CaregiverComponent
  },
  {
    path: "patient",
    component: PatientComponent
  },
  {
    path: "patient/personal",
    component: PersonalComponent
  },
  {
    path: "patient/plan",
    component: PlanComponent
  },
  {
    path: "404",
    component: ErrorPageComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "contact",
    component: ContactComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
