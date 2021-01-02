import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit, OnDestroy {
  accounts: Array<string> = [];
  recipient: string;
  amount: number = 0;
  accountNumber: string;
  transferred:boolean = false;
  transferSuccessful:boolean = false;
  message: string;
  subscription: Subscription;

  constructor(private auth: AuthService, private cusotmerProvider: CustomerService) { }

  ngOnInit(): void {
    this.auth.isAuthenticated();
    const source = interval(50000);
    this.subscription = source.subscribe(val => this.auth.isAuthenticated());
    this.cusotmerProvider.getCustomer().subscribe(
      res => {
        this.accounts = res.accounts.map(acc => acc.number);
        this.accountNumber = this.accounts[0];
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  transferBalance() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!this.recipient || !re.test(this.recipient.toLocaleLowerCase())) {
      this.transferred = true;
      this.transferSuccessful = false;
      this.message = 'Please enter a valid email address for the recipient.';
    }
    else if (!this.accountNumber) {
      this.transferred = true;
      this.transferSuccessful = false;
      this.message = 'Please select one of your accounts to send from.';
    }
    else if (this.amount <= 0) {
      this.transferred = true;
      this.transferSuccessful = false;
      this.message = 'The amount to send must be positive.';
    }
    else {
      this.cusotmerProvider.transferBalance(this.recipient, this.accountNumber, this.amount).subscribe(
        res => {
          this.transferred = true;
          this.transferSuccessful = true;
          },
        err => {
          this.transferred = true;
          this.transferSuccessful = false;
          this.message = err.error.message || 'E-Transfer could not be made due to an error on the server';
        }
      );
    }
  }

}
