import { summaryFileName } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  accounts: Array<any> = []
  name: string;
  constructor(private cusotmerProvider: CustomerService) { }

  ngOnInit(): void {
    this.cusotmerProvider.getCustomer().subscribe(
      res => {
        const docs = res.accounts;
        this.name = res.fname
        this.accounts = docs.map(acct_doc => {return {number: acct_doc.number, balance: parseFloat(acct_doc.balance.$numberDecimal)}});
      }
    );
  }

  computeBalance() {
    let total = 0;
    for (let account of this.accounts) {
      total += account.balance;
    }
    return total;
  }

}
