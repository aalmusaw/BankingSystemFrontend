import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';


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
    path:'',
    redirectTo: 'summary',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
