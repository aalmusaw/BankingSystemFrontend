import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  fname: string;
  lname: string;
  email: string;
  password: string;
  passwordReset = false;
  resetSuccessful = false;
  subscription: Subscription;
  constructor(private auth: AuthService, private cusotmerProvider: CustomerService) { }

  ngOnInit(): void {
    this.auth.isAuthenticated();
    const source = interval(50000);
    this.subscription = source.subscribe(val => this.auth.isAuthenticated());
    this.cusotmerProvider.getCustomer().subscribe(
      res => {
        this.fname = res.fname;
        this.lname = res.lname;
        this.email = res.email;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetPassword() {
    this.auth.resetPassword(this.password).subscribe(res => {
      this.passwordReset = true;
      this.resetSuccessful = true;
    },
    error => {
      this.passwordReset = true;
      this.resetSuccessful = false;
    });
  }
}
