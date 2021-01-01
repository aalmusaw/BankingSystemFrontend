import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customerUrl:string = `http://localhost:3002/customer/${localStorage.getItem('email')}`;
  constructor(private http: HttpClient, private _auth: AuthService) {}

  getCustomer() {
    this._auth.refreshToken();
    let headers = new HttpHeaders();
    const header = headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.http.get<any>(this._customerUrl, {headers: header});
  }
}
