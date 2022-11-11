import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  name: any = {};
  email: any = {};
  msg: any = {};

  constructor(
    private router: Router,
    
    ) {}

  ngOnInit(): void {
  }
  login(){
    this.router.navigate(['/login']);
  }
  scrollToElement($element:any): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  contactForm = new FormGroup({
    name : new FormControl(''),
    email : new FormControl(''),
    msg : new FormControl(''),
  });
  contactusDetail() {
    const userData = {
      name : this.contactForm.value.name,
      email: this.contactForm.value.email,
      msg: this.contactForm.value.msg,
    }
    console.log(userData);
  }
}
