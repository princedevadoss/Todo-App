import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientRequestService {

  constructor(private http: HttpClient) { }

  signup(postObj) {
    return this.http.post('app/todo/signup', postObj);
  }
}
