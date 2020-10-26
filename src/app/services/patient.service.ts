import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FullDetailPlan } from '../models/fulldetailplan';
import { PatientAux } from '../models/patientaux';

const URLCONST: string = "http://localhost:8080/patient/";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient:HttpClient) {
  }

  getPatientById(id: string): Observable<any> {
    let url: string = `${URLCONST}get-patient/${id}`;
    return this.httpClient.get<PatientAux[]>(url);
  }

  getPlans(id: string): Observable<any> {
    let url: string = `${URLCONST}get-plans/${id}`;
    return this.httpClient.get<FullDetailPlan[]>(url);
  }
}
