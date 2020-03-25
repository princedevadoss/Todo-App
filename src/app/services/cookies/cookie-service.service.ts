import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {

  constructor(private todoCookies: CookieService) { }

  getCookie(key) {
    return this.todoCookies.get(key);
  }
  
  deleteCookie(key) {
    this.todoCookies.delete(key);
  }
}
