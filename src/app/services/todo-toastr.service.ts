import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TodoToastrService {

  constructor(private toastr: ToastrService) { }

  errorMessage(msg) {
    this.toastr.error(msg);
  }

  successMessage(msg) {
    this.toastr.success(msg);
  }
}
