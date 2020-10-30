import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { single } from 'rxjs/operators';
import { SignUp } from '../models/signUp';

const URLCONST: string = "http://localhost:8080/doctor/";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient: HttpClient) { }

  addPlan(signUp: SignUp) : Observable<any>{
    let url: string = `${URLCONST}add-doctor`;
    return this.httpClient.post<any>(url, signUp);
  }
}
