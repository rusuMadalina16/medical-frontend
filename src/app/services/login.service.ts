import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const URLCONST: string = "http://localhost:8080/log-in";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  logIn(username: string, password: string): Observable<any> {
    let url: string = `${URLCONST}/${username}/${password}`;
    return this.httpClient.get<User>(url);
  }
}
