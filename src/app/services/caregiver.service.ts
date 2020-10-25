import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caregiver } from '../models/caregiver';
import { Patient } from '../models/patient';

const URLCONST: string = "http://localhost:8080/caregiver/";

@Injectable({
  providedIn: 'root'
})
export class CaregiverService {

  constructor(private httpClient: HttpClient) { }

  getPatientsByCaregiverId(id: String): Observable<any> {
    let url: string = `${URLCONST}get-patients/${id}`;
    return this.httpClient.get<Patient[]>(url);
  }

  getCaregiverById(id: String): Observable<any> {
    let url: string = `${URLCONST}get-caregiver/${id}`;
    return this.httpClient.get<Caregiver>(url);
  }
}
