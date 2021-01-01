import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string;
  
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/summary']);
    }
  }

  loginUser() {
    if (!this.email && !!this.password) {
      this.message = 'You must enter your email address.';
      return;
    }
    if (!this.password && !!this.email) {
      this.message = 'You must enter your password.';
      return;
    }
    if (!this.email && !this.password) {
      this.message = 'You must enter your email and password.';
      return;
    }
    this._auth.loginUser(this.email, this.password)
    .subscribe(res => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('email', this.email);
      this._router.navigate(['/summary']);
    },
    err => {
      this.message = err.error.message;
    });
  }

}
