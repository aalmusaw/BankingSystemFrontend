import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl: string = 'http://localhost:3000/login';
  private _refreshTokenUrl = 'http://localhost:3000/refreshToken';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }
  loginUser(email: string, password: string) {
    return this.http.post<any>(this._loginUrl, {email, password});
  }

  isAuthenticated() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }
    const accessToken = localStorage.getItem('accessToken');
    let expired = this.jwtHelper.isTokenExpired(accessToken);
    if (!expired) {
      return true;
    }
    else {
      this.refreshToken();
      return !this.jwtHelper.isTokenExpired(accessToken);
    }
  }

  refreshToken() {
    this.http.post<any>(this._refreshTokenUrl, {refreshToken: localStorage.getItem('refreshToken')})
    .subscribe(res => {
      localStorage.setItem('accessToken', res.accessToken);
    });
  }

  logout() {
    return this.http.post<any>(this._refreshTokenUrl, {refreshToken: localStorage.getItem('refreshToken')});
  }
}
