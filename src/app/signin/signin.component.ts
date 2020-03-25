import { Component, OnInit } from '@angular/core';
import { ClientRequestService } from '../client-request.service';
import { TodoToastrService } from '../services/todo-toastr.service';
import { ActivatedRoute } from '@angular/router';
import { CookieServiceService } from '../services/cookies/cookie-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  errorMapper: object = {
    0: {value: false, class: '', msg: ''},
    1: {value: false, class: '', msg: ''}
  };
  email: string = '';
  password: string = '';
  constructor(private client: ClientRequestService, 
              private todoToastr: TodoToastrService, 
              private route: ActivatedRoute,
              private todoCookies: CookieServiceService) { }

  ngOnInit(): void {
    if(this.todoCookies.getCookie('user_val') === 'success') {
      this.todoToastr.successMessage('Email Successfully verified... Please Sign in');
      this.todoCookies.deleteCookie('user_val');
    }
  }

  checkValidations(email, password) {
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
    return validator;
  }

  signin() {
    if(this.checkValidations(this.email, this.password)) {
      this.client.signin({
        email: this.email,
        password: this.password
      }).subscribe(data => {
        if(data['message']) {
          this.todoToastr.successMessage(data['message']);
        }
        else {
          this.todoToastr.errorMessage(data['error']);
        }
      }, err => {
        console.log('error');
      });
    }
  }

}
