import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudMedicationComponent } from './doctor/crud-medication/crud-medication.component';
import { CrudPatientComponent } from './doctor/crud-patient/crud-patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { LogInComponent } from './log-in/log-in.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
