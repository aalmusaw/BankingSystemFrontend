import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParameterCodec} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customerUrl:string = `http://localhost:3002/customer/${localStorage.getItem('email')}`;
  private _merchantUrl:string = 'http://localhost:3002/merchant/';


  constructor(private http: HttpClient, private _auth: AuthService) {}

  getCustomer() {
    let headers = new HttpHeaders();
    const header = headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.http.get<any>(this._customerUrl, {headers: header});
  }

  payBill(merchant: string, accountNumber: string, amount: number) {
    let headers = new HttpHeaders();
    const url = this._merchantUrl+encodeURIComponent(merchant);
    const body = {accountNumber: accountNumber, amount: amount};
    const header = headers
    .append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
    .append('Content-Type', 'application/json');
    return this.http.post<any>(url, body, {headers: header});
  }

  getMerchants() {
    let headers = new HttpHeaders();
    const header = headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.http.get<any>(this._merchantUrl, {headers: header});
  }
}
