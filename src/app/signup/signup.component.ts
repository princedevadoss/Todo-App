import { Component, OnInit } from '@angular/core';
import { ClientRequestService } from '../client-request.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name: string = '';
  errorMapper: object = {
    0: {value: false, class: '', msg: ''},
    1: {value: false, class: '', msg: ''},
    2: {value: false, class: '', msg: ''},
    3: {value: false, class: '', msg: ''},
    4: {value: false, class: '', msg: ''},
    5: {value: false, class: '', msg: ''},
  };
  phno: string = '';
  ext: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  extValidation: RegExp = new RegExp('^\\+[0-9]{1,3}$');
  numericValidation: RegExp = new RegExp('^[0-9]{10,10}$');
  constructor(private client: ClientRequestService, private router: Router) { }

  ngOnInit(): void {
  }

  checkValidations(name, email, ext, phno, password, confpass) {
    var validator = true;
    for(var i=0; i<arguments.length; i++) {
      if(arguments[i].length <= 0) {
        this.errorMapper[i].value = true;
        this.errorMapper[i].class = 'error';
        this.errorMapper[i].msg = 'Please fill this field';
        validator = false;
      }
      else {
        this.errorMapper[i].value = false;
        this.errorMapper[i].class = '';
      }
    }
    if(password.length < 8 && !this.errorMapper[4].value) {
      this.errorMapper[4].value = true;
      this.errorMapper[4].class = 'error';
      this.errorMapper[4].msg = 'Password must contain atleast 8 characters';
      validator = false;
    }
    if(confpass !== password && !this.errorMapper[5].value) {
      this.errorMapper[5].value = true;
      this.errorMapper[5].class = 'error';
      this.errorMapper[5].msg = 'Confirm Password should be same as password';
      validator = false;
    }
    if(!this.numericValidation.test(phno) && !this.errorMapper[3].value) {
      this.errorMapper[3].value = true;
      this.errorMapper[3].class = 'error';
      this.errorMapper[3].msg = 'Please enter proper Mobile number';
      validator = false;
    }
    if(!this.extValidation.test(ext) && !this.errorMapper[2].value) {
      this.errorMapper[2].value = true;
      this.errorMapper[2].class = 'error';
      this.errorMapper[2].msg = 'Please enter proper country code starts with +';
      validator = false;
    }
    return validator;
  }

  signup() {
    if(this.checkValidations(this.name, this.email, this.ext, this.phno, this.password, this.confirmPassword)) {
      this.client.signup({
        name: this.name,
        email: this.email,
        mobile: this.ext + this.phno,
        password: this.password
      }).subscribe(data => {
        if(data['message']) {
          this.router.navigate(['/home']);
        }
      }, err => {
        console.log('error');
      });
    }
  }
}