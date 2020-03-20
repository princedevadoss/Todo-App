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
  extValidation: RegExp = new RegExp('^\\+[0-9]{1,3}$');
  numericValidation: RegExp = new RegExp('^[0-9]+$');
  constructor(private client: ClientRequestService) { }

  ngOnInit(): void {
  }

  checkValidations() {
    if(this.name.length > 0 && this.email.length && this.phno.length > 0 && this.password.length > 0 && this.password.length > 7 && this.ext.length > 0 && this.confirmPassword.length > 0 && this.confirmPassword === this.password && this.numericValidation.test(this.phno) && this.extValidation.test(this.ext)) {
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