import { Component, OnInit } from '@angular/core';
import { ClientRequestService } from '../client-request.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name: string = '';
  phno: string = '';
  ext: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor(private client: ClientRequestService) { }

  ngOnInit(): void {
  }

  checkValidations() {
    if(this.name.length > 0 && this.email.length && this.phno.length  && this.password.length && this.ext.length > 0 && this.confirmPassword.length > 0 ) {
      return true
    }
    else {
      return false;
    }
  }

  hello() {
    if(this.checkValidations()) {
      this.client.signup({
        name: this.name,
        email: this.email,
        mobile: this.ext + this.phno,
        password: this.password
      }).subscribe(data => {
        console.log(data);
        console.log(this.name);
      }, err => {
        console.log('error');
      });
    }
  }
}