import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caregiver } from '../models/caregiver';
import { Doctor } from '../models/doctor';
import { Medication } from '../models/medication';
import { Patient } from '../models/patient';
import { Plan } from '../models/plan';
import { PatientAux } from '../models/patientaux';
import { UserLogIn } from '../models/userLogIn';

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

  getMedByName(name: string): Observable<any> {
    let url: string = `${URLCONST}get-med/${name}`;
    return this.httpClient.get<Medication[]>(url);
  }

  //PATIENTS
  getAllPatients(): Observable<any> {
    let url: string = `${URLCONST}get-patients`;
    return this.httpClient.get<PatientAux[]>(url);
  }

  addPatient(cat: Patient) : Observable<any>{
    let url: string = `${URLCONST}add-patient/`;
    return this.httpClient.post<any>(url, cat);
  }

  updatePatient(cat: PatientAux): Observable<any>{
    let url: string = `${URLCONST}update-patient`;
    return this.httpClient.put<any>(url, cat);
  }

  deletePatient(id: String): Observable<any>{
    let url: string = `${URLCONST}delete-patient/${id}`;
    return this.httpClient.delete<any>(url);
  }

  getPatientById(id: String): Observable<any> {
    let url: string = `${URLCONST}get-patient/${id}`;
    return this.httpClient.get<Patient>(url);
  }

  getPatientByName(name: String): Observable<any> {
    let url: string = `${URLCONST}ppatient/${name}`;
    return this.httpClient.get<Patient[]>(url);
  }

  updatePatientCaregiver(cat: PatientAux): Observable<any>{
    let url: string = `${URLCONST}update-patient-caregiver`;
    return this.httpClient.put<any>(url, cat);
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

  getCaregiverById(id: String): Observable<any> {
    let url: string = `${URLCONST}get-caregiver/${id}`;
    return this.httpClient.get<Caregiver>(url);
  }

  getCaregiverByName(name: String): Observable<any> {
    let url: string = `${URLCONST}ccare/${name}`;
    return this.httpClient.get<Caregiver[]>(url);
  }

  //DOCTOR
  getDoctorById(id: String): Observable<any> {
    let url: string = `${URLCONST}get-doctor/${id}`;
    return this.httpClient.get<Doctor>(url);
  }

  getPatientsByDoctorId(id: String): Observable<any> {
    let url: string = `${URLCONST}get-patients/${id}`;
    return this.httpClient.get<PatientAux[]>(url);
  }

  //PLAN
  addPlan(plan: Plan) : Observable<any>{
    let url: string = `${URLCONST}add-plan`;
    return this.httpClient.post<any>(url, plan);
  }

  getPatientAccount(id: String): Observable<any> {
    let url: string = `${URLCONST}get-patient-details/${id}`;
    return this.httpClient.get<UserLogIn>(url);
  }

  getCaregiverAccount(id: String): Observable<any> {
    let url: string = `${URLCONST}get-caregiver-details/${id}`;
    return this.httpClient.get<UserLogIn>(url);
  }
}
