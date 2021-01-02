import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {
  @Input() accountNumber: string;
  @Input() accountBalance: number;
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  onSelect() {
    this.router.navigate(['/account', this.accountNumber]);
  }

}
