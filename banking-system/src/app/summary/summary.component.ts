import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { AuthService } from '../auth.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {
  accounts: Array<any> = []
  name: string;
  subscription: Subscription;
  constructor(private cusotmerProvider: CustomerService, private auth: AuthService) { }

  ngOnInit(): void {
  const source = interval(50000);
  this.subscription = source.subscribe(val => this.auth.isAuthenticated());
    this.auth.isAuthenticated(); // refreshes token
    this.cusotmerProvider.getCustomer().subscribe(
      res => {
        const docs = res.accounts;
        this.name = res.fname
        this.accounts = docs.map(acct_doc => {return {number: acct_doc.number, balance: parseFloat(acct_doc.balance.$numberDecimal)}});
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  computeBalance() {
    let total = 0;
    for (let account of this.accounts) {
      total += account.balance;
    }
    return total;
  }

}
