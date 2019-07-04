import { AddBondComponent } from './add-bond/add-bond.component';
import { CommonsModule } from "./../CommonModule/commons.module";
import { CreditRoutingModule } from "./credit-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreditsFilterComponent } from "./credits-filter/credits-filter.component";
import { CreditComponent } from "./credit/credit.component";
import { CreditsManagementComponent } from "./credits-management/credits-management.component";
import { SlideInOutModule } from "../SlideInOutModule/slide-in-out.module";
import { GridModule, ExcelModule } from "@progress/kendo-angular-grid";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { AddCashComponent } from "./add-cash/add-cash.component";
import { AddWarrantyComponent } from './add-warranty/add-warranty.component';
import { AddCheckComponent } from "./add-check/add-check.component";
import { NumberDirective } from './numbersOnly.directive';
import { FormalLetterManagementComponent } from './formal-letter-management/formal-letter-management.component';
import { OrdersManagementComponent } from './orders-management/orders-management.component';
import { CustomersGuarantySummaryComponent } from './customers-guaranty-summary/customers-guaranty-summary.component';
import { CustomersGuaranteedOrdersComponent } from './customers-guaranteed-orders/customers-guaranteed-orders.component';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { CreditExtensionDetailsComponent } from './credit-extension-details/credit-extension-details.component';
import { AddLetterComponent } from './add-letter/add-letter.component';
import { GuaranteeComponent } from './guarantee/guarantee.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FormalLetterDetailsComponent } from './formal-letter-details/formal-letter-details.component';
import { TradesReportComponent } from './trades-report/trades-report.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


@NgModule({
  imports: [
    CommonModule,
    CreditRoutingModule,
    SlideInOutModule,
    GridModule,
    ExcelModule,
    InputsModule,
    LayoutModule,
    DropDownsModule,
    DpDatePickerModule,
    DialogsModule,
    NotificationModule,
    CommonsModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonsModule,
    FormsModule,
    InputsModule,
    TooltipModule
  ],
  declarations: [
    CreditsManagementComponent,
    CreditComponent,
    CreditsFilterComponent,
    AddCashComponent,
    AddCheckComponent,
    AddWarrantyComponent,
    AddBondComponent,
    NumberDirective,
    FormalLetterManagementComponent,
    OrdersManagementComponent,
    CustomersGuarantySummaryComponent,
    CustomersGuaranteedOrdersComponent,
    CreditExtensionDetailsComponent,
    AddLetterComponent,
    GuaranteeComponent,
    OrderDetailsComponent,
    FormalLetterDetailsComponent,
    TradesReportComponent,
    AdminPanelComponent

  ],
  exports: [CreditsManagementComponent, CreditComponent, CreditsFilterComponent, AddCashComponent , AdminPanelComponent]
})
export class CreditModule {}
