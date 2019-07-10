import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { CustomersGuaranteeSummaryServiceService } from '../../services/customers-guarantee-summary-service.service';
import { Order } from '../../Models/Order/Order';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { OrdersService } from '../../services/orders.service';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-customers-guaranteed-orders',
  templateUrl: './customers-guaranteed-orders.component.html',
  styleUrls: ['./customers-guaranteed-orders.component.css']
})
export class CustomersGuaranteedOrdersComponent implements OnInit, OnDestroy {
  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [];
  public loadingGrid = true;
  public disableBtn = false;
  public disableShowBtn = true;
  public panelTypeEnum: string = "";

  @Input() customerId:number;
  @Output() refresoccured: EventEmitter<void> = new EventEmitter();
  constructor(

    private letterService: CustomersGuaranteeSummaryServiceService,
    private orderService: OrdersService,
    private notificationService: NotificationService

  ) {
    this.allData = this.allData.bind(this);
  }

  public pageSize = 10;
  public skip = 0;

  private state = false;
  private dataRes = [];

  public creditOptin = "credit";
  public result;

  public opened: boolean = false;

  public close(status) {
    if (status === "no") {
      this.opened = false;
      return;
    }

  }

  public open() {
    if (
      this.selectedCreditItemResult == null ||
      this.selectedCreditItemResult === undefined
    )
      return;
    this.opened = true;
  }





  public ngOnInit(): void {
    this.gridData = {
      data: this.dataRes,
      total: 0
    };



    this.creditServiceSubscriber = this.letterService.getAllcustomersGuaranteeOrderCollection(this.customerId).subscribe(
      result => {

        this.dataRes = result as Order[];
        this.gridData.data = this.dataRes;
        try {
          this.gridData.total = this.dataRes.length;
        } catch (ex) {
          console.error(ex);
        }
        this.loadItems();

        this.loadingGrid = false;
      }
    );
  }

  sidebarSubscriber: Subscription;
  backGroundSubscriber: Subscription;
  creditServiceSubscriber: Subscription;
  ngOnDestroy(): void {
    if (this.sidebarSubscriber !== undefined) {
      this.sidebarSubscriber.unsubscribe();
    }

    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.creditServiceSubscriber !== undefined) {
      this.creditServiceSubscriber.unsubscribe();
    }
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadAllItems(): void {
    var resultSort = orderBy(this.dataRes, this.sort);
    var resultFilter = filterBy(resultSort, this.filter);
    this.gridData = {
      data: resultFilter,
      total: resultFilter.length
    };
  }

  private loadItems(): void {
    var resultSort = this.dataRes.slice(this.skip, this.skip + this.pageSize);
    this.gridData = {
      data: resultSort,
      total: this.dataRes.length
    };
  }
  public mymenuState: string = "out";
  public mybg = "#fff";
  public typeOpereation = "";

  openNew() {

  }

  showCreditDetails() {

  }

  openEdit() {

  }

  public onRefreshOccured() {
    this.loadingGrid = true;
  }

  public onSideBarClosedOccured() {
    this.disableBtn = false;
    this.disableShowBtn = false;
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadAllItems();
  }
  public filter: CompositeFilterDescriptor;
  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.loadAllItems();
    // this.gridData = filterBy(sampleProducts, filter);
  }

  // public allData= ():any[]=>  {
  //    return this.gridData.data;
  // }

  public allData(): ExcelExportData {
    var res = this.dataRes;
    const result: ExcelExportData = {
      data: res
    };

    return result;
  }

  public doWork(eve) {
  }
  public selectedCreditItemResult: Order = null;
  public selected(e) {
    //Problem here
    let selectedCredit = new Order();
    this.disableShowBtn = false;
    this.selectedCreditItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as Order)
      : new Order();
  }







  public onSelect({ item }): void {

  }

  public createNewCredit(): void {
  }

  synchronizeByOrderId(orderId:number):void{
    this.loadingGrid=true;
  this.orderService.synchronizeOrderByOrderId(orderId).subscribe(x=>{
    this.loadingGrid=false;
    this.refresoccured.emit();
  } ,err => {
    this.loadingGrid=false;
    this.showError(err);
  });
}

public showError(err: any): void {
  this.notificationService.show({
    content: err.error.message,
    height: 40,
    animation: { type: "fade", duration: 1000 },
    position: { horizontal: "center", vertical: "top" },
    type: { style: "error", icon: true },
    closable: true
  });
}

checkIsSelectedRow(creditId: number) {


  if (
    this.selectedCreditItemResult == undefined ||
    this.selectedCreditItemResult == null
  )
    return true;


  if (this.selectedCreditItemResult.orderId == creditId) return false;
  return true;
}

}

