import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit, OnDestroy {
  accounts: Array<string> = [];
  merchants: Array<string> = [];
  merchant: string;
  amount: number = 0;
  accountNumber: string;
  billPayed:boolean = false;
  paySuccessful:boolean = false;
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
    this.getMerchants();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  payBill() {
    if (!this.merchant || !this.merchants.includes(this.merchant)) {
      this.billPayed = true;
      this.paySuccessful = false;
      this.message = 'Please select one of the merchants in the list.';
    }
    else if (!this.accountNumber) {
      this.billPayed = true;
      this.paySuccessful = false;
      this.message = 'Please select one of your accounts to pay from.';
    }
    else if (this.amount <= 0) {
      this.billPayed = true;
      this.paySuccessful = false;
      this.message = 'The amount to pay must be positive.';
    }
    else {
      this.cusotmerProvider.payBill(this.merchant, this.accountNumber, this.amount).subscribe(
        res => {
            this.billPayed = true;
            this.paySuccessful = true;
          },
        err => {
          this.billPayed = true;
          this.paySuccessful = false;
          this.message = 'Payment could not be made due to an error on the server'
        }
      );
    }
  }

  getMerchants() {
    this.cusotmerProvider.getMerchants().subscribe(
      res => {
        this.merchants = res.merchants;
        this.merchants.sort();
        this.merchant = this.merchants[0];
      }
    )
  }

}
