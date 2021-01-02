import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    if (!this._auth.isLoggedIn()) {
      this._router.navigate(['/login']);
    }
    else {
      this._auth.logout().subscribe(
        res => {
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          this._router.navigate(['/login']);
        }
      );
    }
  }

}
