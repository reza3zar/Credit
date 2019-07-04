import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TradesReportComponent } from './trades-report/trades-report.component';
import { GuaranteeComponent } from './guarantee/guarantee.component';
import { CustomersGuarantySummaryComponent } from './customers-guaranty-summary/customers-guaranty-summary.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { CreditsManagementComponent } from './credits-management/credits-management.component';
import { HomeLayoutComponent } from '../CommonModule/home-layout/home-layout.component';
import { FormalLetterManagementComponent } from './formal-letter-management/formal-letter-management.component';
import { OrdersManagementComponent } from './orders-management/orders-management.component';
import { NotFoundComponent } from '../CommonModule/not-found/not-found.component';


const routes: Routes = [


  {
    path: "",
    component: HomeLayoutComponent,
    children: [
       {path: '', component: CreditsManagementComponent},
    {path: 'formalletter', component: FormalLetterManagementComponent},
    {path: 'orders', component: OrdersManagementComponent},
    {path: 'guarantee', component: GuaranteeComponent},
    {path: 'tradesReport', component: TradesReportComponent},
    {path: 'customersguaranteesummary', component: CustomersGuarantySummaryComponent},
    {path: 'admin-panel', component: AdminPanelComponent},
    {path: '**', component: NotFoundComponent},
  ]


  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]

})
export class CreditRoutingModule {
}
