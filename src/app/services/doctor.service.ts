import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caregiver } from '../models/caregiver';
import { Medication } from '../models/medication';
import { Patient } from '../models/patient';

const URLCONST: string = "http://localhost:8080/doctor/";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  //MEDICATIONS
  getAllMedication(): Observable<any> {
    let url: string = `${URLCONST}get-medications`;
    return this.httpClient.get<Medication[]>(url);
  }

  addMedication(cat: Medication) : Observable<any>{
    let url: string = `${URLCONST}add-medication/`;
    return this.httpClient.post<any>(url, cat);
  }

  updateMedication(cat: Medication): Observable<any>{
    let url: string = `${URLCONST}update-medication`;
    return this.httpClient.put<any>(url, cat);
  }

  deleteMedication(id: String): Observable<any>{
    let url: string = `${URLCONST}delete-medication/${id}`;
    return this.httpClient.delete<any>(url);
  }

  //PATIENTS
  getAllPatients(): Observable<any> {
    let url: string = `${URLCONST}get-patients`;
    return this.httpClient.get<Patient[]>(url);
  }

  addPatient(cat: Patient) : Observable<any>{
    let url: string = `${URLCONST}add-patient/`;
    return this.httpClient.post<any>(url, cat);
  }

  updatePatient(cat: Patient): Observable<any>{
    let url: string = `${URLCONST}update-patient`;
    return this.httpClient.put<any>(url, cat);
  }

  deletePatient(id: String): Observable<any>{
    let url: string = `${URLCONST}delete-patient/${id}`;
    return this.httpClient.delete<any>(url);
  }

  //CAREGIVERS
  getAllCarevigers(): Observable<any> {
    let url: string = `${URLCONST}get-caregivers`;
    return this.httpClient.get<Caregiver[]>(url);
  }

  addCaregiver(cat: Caregiver) : Observable<any>{
    let url: string = `${URLCONST}add-caregiver/`;
    return this.httpClient.post<any>(url, cat);
  }

  updateCaregiver(cat: Caregiver): Observable<any>{
    let url: string = `${URLCONST}update-caregiver`;
    return this.httpClient.put<any>(url, cat);
  }

  deleteCaregiver(id: String): Observable<any>{
    let url: string = `${URLCONST}delete-caregiver/${id}`;
    return this.httpClient.delete<any>(url);
  }
}
