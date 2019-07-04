import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotFoundComponent } from './CommonModule/not-found/not-found.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AppComponent } from './app.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SlideService } from "./services";
import { InActiveBackgroundService } from "./in-active-background.service";
import { HomeLayoutComponent } from './CommonModule/home-layout/home-layout.component';

// {path: 'credit',loadChildren : "./CreditModule/credit.module#CreditModule"},
// {
//   path: '',
//   pathMatch: 'full',
//   redirectTo: 'credit'
// },
// { path: '',loadChildren : "./home/home.module#HomeModule"},
// { path: '',loadChildren : "./CreditModule/credit.module#CreditModule"},
// {
//   path: 'credit',
//   loadChildren: './CreditModule/credit.module#CreditModule'
// },
// {
//   path: 'home',
//   loadChildren: './home/home.module#HomeModule'
// },
// {
//   path: '',
//   redirectTo: 'home',
//   pathMatch: 'full'
// },

// { path: "**", component: NotFoundComponent }


const routes: Routes = [
  {
    path: "customers",
    loadChildren: "./customers/customers.module#CustomersModule"
  },
  {
    path: "orders",
    loadChildren: "./orders/orders.module#OrdersModule"
  },
  {
    path: "credit",
    loadChildren: "./CreditModule/credit.module#CreditModule"
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomeModule"
  },





  { path: 'login', component: LoginLayoutComponent,children: [
    { path: "", component: LoginComponent },
    ]

  },

  { path: 'changepassword', component: HomeLayoutComponent,children: [
    { path: "", component: ChangePasswordComponent },]

  },
  // {
  //   path: "**",
  //   component:NotFoundComponent
  // },
  ];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  declarations: [],
  exports: [RouterModule],
  providers: [SlideService, InActiveBackgroundService]
})
export class AppRoutingModule {}
