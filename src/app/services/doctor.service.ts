import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medication } from '../models/medication';

const URLCONST: string = "http://localhost:8080/doctor/";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllMedication(): Observable<any> {
    let url: string = `${URLCONST}get-medications`;
    return this.httpClient.get<Medication[]>(url);
  }
}
