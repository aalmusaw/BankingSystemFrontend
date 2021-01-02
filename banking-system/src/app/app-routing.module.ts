import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { TransactionsComponent } from './transactions/transactions.component';
import { PayBillComponent } from './pay-bill/pay-bill.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/:number',
    component: TransactionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'paybill',
    component: PayBillComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    redirectTo: 'summary',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
