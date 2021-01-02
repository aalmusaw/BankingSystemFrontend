import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PayBillComponent } from './pay-bill/pay-bill.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SummaryComponent,
    AccountSummaryComponent,
    LogoutComponent,
    ProfileComponent,
    TransactionsComponent,
    PayBillComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
