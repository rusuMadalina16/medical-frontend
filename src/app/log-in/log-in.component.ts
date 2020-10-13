import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
   this.scrollThing();
  }

  scrollThing(): void{
    window.onscroll = function() {myFunction()};
    var navbar = document.getElementById("navbar");
    var serviceWrapper = document.getElementById("service-wrapper")
    var sticky = navbar.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        serviceWrapper.classList.add("service-stick-mode");
      } else {
        navbar.classList.remove("sticky");
        serviceWrapper.classList.remove("service-stick-mode");
      }
    }
  }

}
