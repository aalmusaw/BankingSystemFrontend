import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';

import { CustomerService } from '../customer.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  accountNumber: string;
  accountBalance: number;
  subscription: Subscription;
  transactions: Array<any> = [];
  filtered: Array<any> = [];
  month: number | string;
  year: number | string;

  constructor( private route: ActivatedRoute, private cusotmerProvider: CustomerService,
    private auth: AuthService) { }

  ngOnInit(): void {
    const date = new Date();
    this.month = date.getMonth()+1;
    this.year = date.getFullYear();
    const source = interval(50000);
    this.subscription = source.subscribe(val => this.auth.isAuthenticated());
    this.auth.isAuthenticated(); // refreshes token
    this.accountNumber = this.route.snapshot.paramMap.get('number');
    this.cusotmerProvider.getCustomer().subscribe(
      res => {
        const account = res.accounts.filter(acc => acc.number == this.accountNumber)[0];
        this.accountBalance = account.balance.$numberDecimal
        this.transactions = account.transactions.map(transaction => {
          return {
            date: transaction.date.split("T")[0],
            amount: parseFloat(transaction.amount.$numberDecimal),
            detail: transaction.detail
          };
        });
        this.filterTransactions();
      },
      err => {
        console.log('An error occured while retrieving transactions');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterTransactions() {
    this.filtered = this.transactions
    .filter(transaction => parseInt(transaction.date.substring(0, 4), 10) == this.year)
    .filter(transaction => parseInt(transaction.date.substring(5, 7), 10) == this.month);
  }

}
