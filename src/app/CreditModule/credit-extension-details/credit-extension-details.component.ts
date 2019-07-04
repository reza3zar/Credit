import { Credit } from './../../Models/Credit/Credit';
import { RevokeCredit } from './../../Models/Credit/RevokeCredit';
import { OnInit, Component, OnDestroy, Input } from "@angular/core";

import {
  filterBy,
  SortDescriptor,
  orderBy,
  CompositeFilterDescriptor
} from "@progress/kendo-data-query";

import {
  DialogService,
  DialogRef,
  DialogCloseResult
} from "@progress/kendo-angular-dialog";

import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";

import { ExcelExportData } from "@progress/kendo-angular-excel-export";

import { Subscription } from "rxjs";
import { credit } from '../../services/credit.service';

@Component({
  selector: 'app-credit-extension-details',
  templateUrl: './credit-extension-details.component.html',
  styleUrls: ['./credit-extension-details.component.css']
})
export class CreditExtensionDetailsComponent implements OnInit, OnDestroy {
  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [];
  public loadingGrid = true;
  public disableBtn = false;
  public disableShowBtn = true;
  public panelTypeEnum: string = "";

  @Input() creditId:number;

  constructor(
    private service:credit

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

      return;
  }





  public ngOnInit(): void {


    this.creditServiceSubscriber=this.service.getCreditById(this.creditId).subscribe(result=>{
      this.dataRes = (result as Credit).history;
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

  this.gridData = {
    data: this.dataRes,
    total: 0
  };
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








  public onSelect({ item }): void {

  }

  public createNewCredit(): void {
  }
}

