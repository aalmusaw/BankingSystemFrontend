import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = 'http://localhost:3000/login';
  private _refreshTokenUrl = 'http://localhost:3000/refreshToken';
  private _resetPassUrl = 'http://localhost:3000/resetPass';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }
  loginUser(email: string, password: string) {
    return this.http.post<any>(this._loginUrl, {email, password});
  }

  isAuthenticated() {
    try {
      let expired, decoded;
      this.refreshToken().subscribe(
        res => {
          localStorage.setItem('accessToken', res.accessToken);
          expired = this.jwtHelper.isTokenExpired(res.accessToken);
          decoded = this.jwtHelper.decodeToken(res.accessToken);
        });
        return !expired && decoded.email === localStorage.getItem('email');
    }
    catch {
      return false;
    }
  }


  isLoggedIn() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }
    let expired = this.jwtHelper.isTokenExpired(refreshToken);
    let decoded = this.jwtHelper.decodeToken(refreshToken);
    return !expired && decoded.email==localStorage.getItem('email');
  }

  refreshToken() {
    return this.http.post<any>(this._refreshTokenUrl, {refreshToken: localStorage.getItem('refreshToken')})
  }

  resetPassword(password: string) {
    this.refreshToken();
    let headers = new HttpHeaders();
    const header = headers
    .append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
    .append('Content-Type', 'application/json');
    return this.http.post(this._resetPassUrl, {password: password}, {headers: header});
  }

  logout() {
    return this.http.post<any>(this._refreshTokenUrl, {refreshToken: localStorage.getItem('refreshToken')});
  }
}
