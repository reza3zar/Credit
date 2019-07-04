import { CategoryMenuLeftsideComponent } from './../category-menu-leftside/category-menu-leftside.component';
import { LeftSideComponent } from './../left-side/left-side.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComboComponent } from './bank-combo/bank-combo.component';
import { BrokerComboComponent } from './broker-combo/broker-combo.component';
import { CustomerComboComponent } from './customer-combo/customer-combo.component';
import { CreditCategoryComboComponent } from './credit-category-combo/credit-category-combo.component';
import { ContentLoaderComponent } from './content-loader/content-loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CategoryMenuTopComponent } from '../category-menu-top/category-menu-top.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { RedirectToLogin } from './redirectToLogin.service';
import { RevokeComboxComponent } from './revoke-combox/revoke-combox.component';
import { VerticalMenuComponent } from './vertical-menu/vertical-menu.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { GuaranteeTypeComboComponent } from './guarantee-type-combo/guarantee-type-combo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    ExcelModule,  InputsModule, LayoutModule, DropDownsModule,
    DpDatePickerModule,
    DialogsModule,
    NotificationModule,
    RouterModule,
    // PopupModule
  ],
  declarations: [
    NotFoundComponent,
    ContentLoaderComponent,
    CreditCategoryComboComponent,
    CustomerComboComponent,
    BrokerComboComponent,
    BankComboComponent,
    FooterComponent,
    LeftSideComponent,
    HeaderComponent,
    CategoryMenuLeftsideComponent,
    CategoryMenuTopComponent,
    MenuItemComponent,
    HomeLayoutComponent,
    RevokeComboxComponent,
    VerticalMenuComponent,
    SideNavMenuComponent,
    GuaranteeTypeComboComponent,


  ],
  exports:[
    NotFoundComponent,
    ContentLoaderComponent,
    CreditCategoryComboComponent,
    CustomerComboComponent,
    BrokerComboComponent,
    BankComboComponent,
    LeftSideComponent,
    FooterComponent,
    HeaderComponent
    ,CategoryMenuLeftsideComponent,
    CategoryMenuTopComponent,
    MenuItemComponent,
    HomeLayoutComponent,
    RevokeComboxComponent,
    GuaranteeTypeComboComponent,

  ],
  providers:[
    RedirectToLogin
  ]
})
export class CommonsModule { }
