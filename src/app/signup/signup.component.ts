import { Component, OnInit } from '@angular/core';
import { ClientRequestService } from '../client-request.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name: string = '';
  errorMapper: object = {
    0: {value: false, class: 'a'},
    1: {value: false, class: ''},
    2: {value: false, class: ''},
    3: {value: false, class: ''},
    4: {value: false, class: ''},
    5: {value: false, class: ''},
  };
  phno: string = '';
  ext: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  extValidation: RegExp = new RegExp('^\\+[0-9]{1,3}$');
  numericValidation: RegExp = new RegExp('^[0-9]{10,10}$');
  constructor(private client: ClientRequestService) { }

  ngOnInit(): void {
  }

  checkValidations(name, email, ext, phno, password, confpass) {
    var validator = true;
    for(var i=0; i<arguments.length; i++) {
      if(arguments[i].length <= 0) {
        this.errorMapper[i].value = true;
        this.errorMapper[i].class = 'error';
        validator = false;
      }
      else {
        this.errorMapper[i] = false;
      }
    }
    if(password.length < 8) {
      validator = false;
    }
    if(confpass !== password) {
      validator = false;
    }
    if(!this.numericValidation.test(phno)) {
      validator = false;
    }
    if(!this.extValidation.test(ext)) {
      validator = false;
    }
    return validator;
  }

  hello() {
    if(this.checkValidations(this.name, this.email, this.ext, this.phno, this.password, this.confirmPassword)) {
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