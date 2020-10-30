import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { single } from 'rxjs/operators';
import { SignUp } from '../models/signUp';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUp: SignUp;

  constructor(private router: Router,
    private signUpService:SignUpService) { }

  ngOnInit(): void {
    this.signUp = {
      name: '',
      gender: '',
      address: '',
      username: '',
      password: '',
      birthDate: ''
    }
  }

  addDoctor(): void{
    this.signUpService.addPlan(this.signUp).subscribe(
      (res) => {
        console.log("Very nice job!!!");
        this.router.navigateByUrl("/log-in");
      }
    );
  }


}
