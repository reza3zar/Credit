import { FormalLetter } from './../../Models/Credit/FormalLetter';
import { LetterService } from './../../services/letter.service';
import { OnInit, Component, OnDestroy } from "@angular/core";

import {
  filterBy,
  process,
  SortDescriptor,
  orderBy,
  CompositeFilterDescriptor,
  State
} from "@progress/kendo-data-query";



import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from "@progress/kendo-angular-grid";

import { ExcelExportData } from "@progress/kendo-angular-excel-export";
import { NotificationService } from "@progress/kendo-angular-notification";
import { InActiveBackgroundService } from "../../in-active-background.service";
import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { Credit } from "../../Models/Credit/Credit";
import { Subscription } from "rxjs";
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../Models/Order/Order';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit, OnDestroy {
  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [];
  public loadingGrid = true;
  public disableBtn = false;
  public disableShowBtn = true;
  public panelTypeEnum: string = "";
  public pageSizes = [
    {text: '12', value: 12},
    {text: '100', value: 100},
    {text: '200', value: 200},
    {text: 'تمام', value: 20000000},

  ];
  constructor(
    private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private orderService: OrdersService,
    private notificationService: NotificationService
  ) {
    this.allData = this.allData.bind(this);
  }

  public pageSize =12;
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
    // this.creditServiceSubscriber = this.creditService
    //   .deleteCreditById(this.selectedCreditItemResult.id)
    //   .subscribe(
    //     data => {
    //       this.showNotifySuccessDelete(data);
    //       this.creditService.getAllCreditsBaseCredittype("credit");
    //     },
    //     err => {
    //       this.showErrorDelete(err);
    //     }
    //   );
    // this.opened = false;
  }

  public open() {
    if (
      this.selectedCreditItemResult == null ||
      this.selectedCreditItemResult === undefined
    )
      return;
    this.opened = true;
  }



  public stateGrid: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'ProductName', operator: 'contains', value: 'Chef' }]
    }
};


  public ngOnInit(): void {
    this.gridData = {
      data: this.dataRes,
      total: 0
    };

    this.sidebarSubscriber = this.sidebarService.change.subscribe(myState => {
      this.mymenuState = myState;
      if (myState === "out") {
        setTimeout(() => {
          this.typeOpereation = "none";
        }, 1000);
      }
    });

    this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
      this.state = myState;
    });
    this.orderOptentionSelected='active';
    this.creditServiceSubscriber = this.orderService.getActiveOrdersCollection().subscribe(
      result => {



        this.dataRes = result as Order[];
        this.gridData.data = this.dataRes;
        try {
          this.gridData.total = this.dataRes.length;
        } catch (ex) {
          console.error(ex);
        }
        this.loadItems(this.dataRes.length);

        this.loadingGrid = false;
      }
    );
  }

  orderOptentionSelected:string='';
  public changeOrdersOptions(orderOption: string) {
    this.pageSize=10;
    this.skip=0;
    this.orderOptentionSelected=orderOption;
    switch (this.orderOptentionSelected) {
      case 'readytotrade':
      this.loadingGrid = true;
      this.creditServiceSubscriber = this.orderService.getReadyToTradeOrdersCollection().subscribe(
        result => {




          this.dataRes = (result) as Order[];
          this.gridData.data = this.dataRes;
          try {
            this.gridData.total = this.dataRes.length;
          } catch (ex) {
            console.error(ex);
          }


          this.loadItems(this.dataRes.length);

          this.loadingGrid = false;
        }
      );

        break;

          case 'active':
          this.loadingGrid = true;
          this.creditServiceSubscriber = this.orderService.getActiveOrdersCollection().subscribe(
            result => {
    
    
    
    
              this.dataRes = (result) as Order[];
              this.gridData.data = this.dataRes;
              try {
                this.gridData.total = this.dataRes.length;
              } catch (ex) {
                console.error(ex);
              }
    
    
              this.loadItems(this.dataRes.length);
    
              this.loadingGrid = false;
            }
          );
    
            break;
    
        case 'traded':
      this.loadingGrid = true;

        this.creditServiceSubscriber = this.orderService.getTradedOrdersCollection().subscribe(
          result => {



            this.dataRes = result as Order[];
            this.gridData.data = this.dataRes;
            try {
              this.gridData.total = this.dataRes.length;
            } catch (ex) {
              console.error(ex);
            }
            this.loadItems(this.dataRes.length);

            this.loadingGrid = false;
          }
        );
        break;

        case 'nottraded':
      this.loadingGrid = true;

        this.creditServiceSubscriber = this.orderService.getNotTradedOrdersCollection().subscribe(
          result => {



            this.dataRes = result as Order[];
            this.gridData.data = this.dataRes;
            try {
              this.gridData.total = this.dataRes.length;
            } catch (ex) {
              console.error(ex);
            }
            this.loadItems(this.dataRes.length);

            this.loadingGrid = false;
          }
        );
        break;

        case 'archived':
        this.loadingGrid = true;
          this.getArchivedOrders(this.skip,this.pageSize);
        break;

      default:
        break;
    }
  }


  getArchivedOrders(skip,pageSize){
    this.creditServiceSubscriber = this.orderService.getArchiveOrdersCollection(skip/pageSize+1,pageSize).subscribe(
      result => {
        this.dataRes = result.items as Order[];
        this.gridData.data = this.dataRes;
        try {
          this.gridData.total = result.totalCount;
        } catch (ex) {
          console.error(ex);
        }
        this.loadItems( result.totalCount);

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

    this.pageSize = event.take;
    // console.log('this.pageSize')
    // console.log(this.pageSize)
    // console.log(this.orderOptentionSelected)
    if(this.orderOptentionSelected==='archived'){

      this.getArchivedOrders(event.skip,event.take);
    }
    else{

      this.skip = event.skip;
      this.loadItems(this.dataRes.length);

      // console.log('this.skip')
      // console.log(this.skip)

    }



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

  private loadItems(totalCount): void {
    var resultFilter = filterBy(this.dataRes, this.filter);
    var resultSort=orderBy(resultFilter, this.sort);

    var resultSort2 = resultSort.slice(this.skip, this.skip + this.pageSize);
    this.gridData = {
      data: resultSort2,
      total:resultFilter.length
    };
  }


  private loadItemsBaseFilterChanged(totalCount,data): void {
        var resultSort = data.slice(0, 10);

        this.gridData = {
          data: resultSort,
          total:totalCount
        };
  }

  public mymenuState: string = "out";
  public mybg = "#fff";
  public typeOpereation = "";

  openNew() {
    this.disableBtn = true;

    this.panelTypeEnum = "searchMode";
    this.typeOpereation = "new";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }

  showCreditDetails() {
    this.disableShowBtn = true;
    this.panelTypeEnum = "showMode";
    this.typeOpereation = "showDetail";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }

  openEdit() {
    this.typeOpereation = "edit";
    this.state = true;
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.mymenuState = "in";
    this.sidebarService.toggle(this.mymenuState);
    this.inActiveServ.changeStatus(true);
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

  }



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
    let selectedCredit = new Credit();
    this.disableShowBtn = false;
    this.selectedCreditItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as Order)
      : new Order();

  }



  public showNotifySuccessDelete(da): void {
    this.notificationService.show({
      content: "عملیات با موفقیت صورت پذیرفت",
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "success", icon: true },
      closable: false
    });
  }

  public showErrorDelete(err: any): void {
    //   type: 'slide', duration: 400
    this.notificationService.show({
      content:

        err.error.message,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "error", icon: true },
      closable: true
    });
  }
  public items: any[] = [
    { text: "Move Up", icon: "arrow-up" },
    { text: "Move Down", icon: "arrow-down" }
  ];
  public onCellClick(e: any): void {
    if (e.type === "contextmenu") {
      const originalEvent = e.originalEvent;

      originalEvent.preventDefault();


    }
  }

  public onSelect({ item }): void {

  }

  public createNewCredit(): void {
    this.typeOpereation = "addNewCredit";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }

  refresh(){
    this.loadingGrid=true;
    this.changeOrdersOptions(this.orderOptentionSelected)
  }

  // public gridData: GridDataResult = process(this.dataRes, this.stateGrid);

  public dataStateChange(state: DataStateChangeEvent): void {

    // this.stateGrid = state;
    // this.gridData = process(this.dataRes, this.stateGrid);
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


synchronizeByOrderId(orderId:number):void{
    this.loadingGrid=true;
  this.orderService.synchronizeOrderByOrderId(orderId).subscribe(x=>{
    this.loadingGrid=false;
  } ,err => {
    this.loadingGrid=false;
    this.showError(err);
  });
}

synchronizeOrders():void{
  this.loadingGrid=true;
  this.sendDataToServer=true;
  this.orderService.synchronizeOrders().subscribe(x=>{
    this.loadingGrid=false;
    this.confirmFormStatus=false;
    this.sendDataToServer=false;
  } ,err => {
    this.loadingGrid=false;
    this.confirmFormStatus=false;
    this.sendDataToServer=false;
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

public sliderChange(pageIndex: number): void {
  this.skip = (pageIndex - 1) * this.pageSize;
}


confirmFormStatus=false;


closeConfirmForm():void{
  this.confirmFormStatus=false;
}

sendDataToServer=false;

showConfirmForm():void{
  this.confirmFormStatus=true;

}

}


