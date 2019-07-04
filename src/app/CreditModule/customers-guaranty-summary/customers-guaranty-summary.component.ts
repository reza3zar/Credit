import { CustomersGuaranteeSummaryServiceService } from './../../services/customers-guarantee-summary-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SortDescriptor, CompositeFilterDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { Subscription } from 'rxjs';
import { CustomerGuaranteeSummary } from '../../Models/Credit/CustomerGuaranteeSummary';
import { PageChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-customers-guaranty-summary',
  templateUrl: './customers-guaranty-summary.component.html',
  styleUrls: ['./customers-guaranty-summary.component.css']
})
export class CustomersGuarantySummaryComponent implements OnInit, OnDestroy {
  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [];
  public loadingGrid = true;
  public disableBtn = false;
  public disableShowBtn = true;
  public panelTypeEnum: string = "";

  constructor(

    private letterService: CustomersGuaranteeSummaryServiceService,

  ) {
    this.allData = this.allData.bind(this);
  }

  public pageSize = 12;
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


    this.refresh();

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
    this.pageSize = event.take;
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

    this.loadItemsBaseFilterChanged(resultFilter.length,resultFilter);
  }

  private loadItemsBaseFilterChanged(totalCount,data): void {
    // var resultSort = data.slice(0, this.skip + this.pageSize);
    var resultSort = data.slice(0, 10);

    this.gridData = {
      data: resultSort,
      total:totalCount
    };
}
private loadItems( ): void {
  var resultFilter = filterBy(this.dataRes, this.filter);
  var resultSort=orderBy(resultFilter, this.sort);

  var resultSort2 = resultSort.slice(this.skip, this.skip + this.pageSize);
  this.gridData = {
    data: resultSort2,
    total:resultFilter.length
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

  private onRefreshOccured() {
    this.loadingGrid = true;
  }

  private onSideBarClosedOccured() {
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
  public selectedCreditItemResult: CustomerGuaranteeSummary = null;
  public selected(e) {
    //Problem here
    let selectedCredit = new CustomerGuaranteeSummary();
    this.disableShowBtn = false;
    this.selectedCreditItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as CustomerGuaranteeSummary)
      : new CustomerGuaranteeSummary();
    //  this.selectedCreditItemResult.Id=selectedCredit.Id
  }







  public onSelect({ item }): void {

  }

  public createNewCredit(): void {
  }

  refresh(){
    this.loadingGrid=true;
    this.creditServiceSubscriber = this.letterService.getAllcustomersGuaranteeSummaryCollection().subscribe(
      result => {

        this.dataRes = result as CustomerGuaranteeSummary[];
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
}

