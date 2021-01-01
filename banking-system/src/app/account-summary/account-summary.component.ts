import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {
  @Input() accountNumber: string;
  @Input() accountBalance: number;
  constructor() { }
  ngOnInit(): void {
  }

}
