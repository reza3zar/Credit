import { credit } from './../../services/credit.service';
import { style } from "@angular/animations";
import { RevokeCredit } from "./../../Models/Credit/RevokeCredit";
import { OnInit, Component, OnDestroy } from "@angular/core";

import {
  filterBy,
  SortDescriptor,
  orderBy,
  CompositeFilterDescriptor,
  aggregateBy
} from "@progress/kendo-data-query";

import {
  DialogService,
  DialogRef,
  DialogCloseResult
} from "@progress/kendo-angular-dialog";

import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";

import { ExcelExportData } from "@progress/kendo-angular-excel-export";
import { NotificationService } from "@progress/kendo-angular-notification";
import { InActiveBackgroundService } from "../../in-active-background.service";
import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { Credit } from "../../Models/Credit/Credit";
import { Subscription } from "rxjs";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ExtendCredit } from "../../Models/Credit/ExtendCredit";

@Component({
  selector: "app-credits-management",
  templateUrl: "./credits-management.component.html",
  styleUrls: ["./credits-management.component.css"]
})
export class CreditsManagementComponent implements OnInit, OnDestroy {
  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [];
  public loadingGrid = true;
  public disableBtn = false;
  public disableShowBtn = true;
  public panelTypeEnum: string = "";

  constructor(
    private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private creditService: credit,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {
    this.allData = this.allData.bind(this);
  }

  public pageSize = 12;
  public skip = 0;

  public state = false;
  public dataRes = [];

   public creditOptin = "credit";
  public result;
  public aggregates: any[] = [{field: 'value', aggregate: 'sum'}];
  public total: any = aggregateBy(this.dataRes, this.aggregates);

  public opened: boolean = false;
  public openedActivate:boolean=false;
  public creditType:string;


  deActiveDescription='';
  activeDescription='';

  public deActive(status) {
    if (status === "no") {
      this.opened = false;
      return;
    }

    this.creditServiceSubscriber = this.creditService
      .inActivateCreditById(this.selectedCreditItemResult.id,this.deActiveDescription)
      .subscribe(
        data => {
          this.showNotifySuccess(data);
          this.changeOrdersOptions(this.creditOptentionSelected);
        },
        err => {
          this.showError(err);
        }
      );
    this.opened = false;
  }


  public activateCredit(status) {
    if (status === "no") {
      this.openedActivate = false;
      return;
    }

    this.creditServiceSubscriber = this.creditService
      .activateCreditById(this.selectedCreditItemResult.id,this.activeDescription)
      .subscribe(
        data => {
          this.showNotifySuccess(data);
          this.changeOrdersOptions(this.creditOptentionSelected);
        },
        err => {
          this.showError(err);
        }
      );
    this.openedActivate = false;
  }

  public openActivateCredit(){
    this.openedActivate=true;
  }

  public open() {
    if (
      this.selectedCreditItemResult == null ||
      this.selectedCreditItemResult === undefined
    )
      return;
    this.opened = true;
  }


  requestForm: FormGroup;
  requestRevokeForm: FormGroup;
  openedExtendCredit = false;
  openedExtendRevokeCredit = false;
  extendata: ExtendCredit = new ExtendCredit();

  sendDataToServerExtend = false;
  onSubmit() {
    this.submitted = true;
    this.requestForm.controls['newDueTime'].setErrors(null);
    if (this.requestForm.invalid) {
      return;
    }
    this.sendDataToServerExtend = true;
    this.extendata.creditId = this.selectedCreditItemResult.id;
    this.creditServiceSubscriber = this.creditService
      .saveExtendCredit(this.extendata)
      .subscribe(
        result => {
          if (result == true) {
            this.showNotifySuccess("");
            this.extendata = new ExtendCredit();
            this.refresh();
            this.openedExtendCredit = false;
            this.sendDataToServerExtend = false;
          }
        },
        err => {
          this.showError(err);
          this.sendDataToServerExtend = false;
        }
      );
  }

  onSubmit2() {
    this.submitted = true;
    if (this.requestRevokeForm.invalid) {
      return;
    }

    this.sendDataToServerLoader = true;
    this.revoke.CreditId = this.selectedCreditItemResult.id;
    this.revoke.Reason = this.revoke.ReasonObject.id;

    if (this.revoke.forceStatus) {
      this.creditServiceSubscriber = this.creditService
        .saveForceRevokedCredit(this.revoke)
        .subscribe(
          result => {
            if (result == true) {
              this.showNotifySuccess("");
              this.revoke = new RevokeCredit();
              this.openedExtendRevokeCredit = false;
          this.changeOrdersOptions(this.creditOptentionSelected);

            }
            this.sendDataToServerLoader = false;
          },
          err => {
            this.showError(err);
            this.sendDataToServerLoader = false;
          }
        );
    }

    if (!this.revoke.forceStatus) {
      this.creditServiceSubscriber = this.creditService
        .saveRevokedCredit(this.revoke)
        .subscribe(
          result => {
            if (result == true) {
              this.showNotifySuccess("");
              this.revoke = new RevokeCredit();
              this.openedExtendRevokeCredit = false;
          this.changeOrdersOptions(this.creditOptentionSelected);

              this.sendDataToServerLoader = false;
            }
            this.sendDataToServerLoader = false;
          },
          err => {
            this.showError(err);
            this.sendDataToServerLoader = false;
          }
        );
    }


  }
  closeExtend() {
    this.extendata = new ExtendCredit();
    this.openedExtendCredit = false;
    this.submitted = false;
  }

  closeExtend2() {
    this.revoke = new RevokeCredit();
    this.openedExtendRevokeCredit = false;
  }
  revokeCredit() {
    this.openedExtendRevokeCredit = true;
  }

  revoke: RevokeCredit = new RevokeCredit();
  submitted = false;
  submitted2 = false;
  get ctrl() {
    return this.requestForm.controls;
  }
  get ctrl2() {
    return this.requestRevokeForm.controls;
  }




  creditOptentionSelected:string;

  public changeOrdersOptions(orderOption: string) {
    this.pageSize=12;
    this.skip=0;

    this.creditOptentionSelected=orderOption;
    switch (this.creditOptentionSelected) {
      case 'hasDeadline':
      this.loadingGrid = true;
      this.creditServiceSubscriber = this.creditService.hasDeadlineCreditsCollection().subscribe(
        result => {

          this.dataRes = result;
          this.gridData.data = this.dataRes;
          try {
            this.gridData.total = this.dataRes.length;
          } catch (ex) {
            console.error(ex);
          }

          this.loadItems(this.dataRes.length);
          this.total= aggregateBy(this.dataRes, this.aggregates);
          this.loadingGrid = false;


        }
      );

        break;


        case 'threshold':
      this.loadingGrid = true;

        this.creditServiceSubscriber = this.creditService.thresholdCreditsCollection().subscribe(
          result => {



            this.dataRes = result ;
            this.gridData.data = this.dataRes;
            try {
              this.gridData.total = this.dataRes.length;
            } catch (ex) {
              console.error(ex);
            }
            // this.loadItemsWithTotalCount( result.length,result);
            this.loadItems(this.dataRes.length);
          this.total= aggregateBy(this.dataRes, this.aggregates);
            this.loadingGrid = false;
          }
        );
        break;

        case 'deActive':
      this.loadingGrid = true;

        this.creditServiceSubscriber = this.creditService.deActiveCreditsCollection().subscribe(
          result => {



            this.dataRes = result ;
            this.gridData.data = this.dataRes;
            try {
              this.gridData.total = this.dataRes.length;
            } catch (ex) {
              console.error(ex);
            }
            // this.loadItemsWithTotalCount( result.length,result);
            this.loadItems(this.dataRes.length);
            this.total= aggregateBy(this.dataRes, this.aggregates);
            this.loadingGrid = false;
          }
        );
        break;

        case 'allCredit':
        this.loadingGrid = true;
        this.creditService.getAllCreditsBaseCredittype("credit");
        break;

      default:
        break;
    }

    this.filter=null;
  }



  public ngOnInit(): void {

    this.creditType="allCredit";

    this.requestForm = this.formBuilder.group({
      creditId: [""],
      newDueTime: ["" ],
      description: ["", []]
    });

    this.requestRevokeForm = this.formBuilder.group({
      creditId: [""],
      reason: ["", Validators.required],
      description: [""],
      forces: [""]
    });

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

    this.changeOrdersOptions(this.creditType)
    this.creditServiceSubscriber = this.creditService.change.subscribe(
      result => {
        // this.creditOptin = result.creditOption;
        this.dataRes = result.data as Credit[];
        this.gridData.data = this.dataRes;
        try {
          this.gridData.total = this.dataRes.length;
        } catch (ex) {
          console.error(ex);
        }
        this.loadItems(this.dataRes.length);
        this.total= aggregateBy(this.dataRes, this.aggregates);
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
    this.skip = event.skip;
    this.loadItems(this.dataRes.length);
  }

  private loadAllItems(): void {

    var resultSort = orderBy(this.dataRes, this.sort);
    var resultFilter = filterBy(resultSort, this.filter);

    this.gridData = {
      data: resultFilter,
      total: resultFilter.length
    };
    this.total= aggregateBy( resultFilter, this.aggregates);

    this.loadItemsBaseFilterChanged(resultFilter.length,resultFilter);


    // var resultSort = orderBy(this.dataRes, this.sort);
    // var resultFilter = filterBy(resultSort, this.filter);

    // this.gridData = {
    //   data: resultFilter,
    //   total: resultFilter.length
    // };

    // this.loadItemsBaseFilterChanged(resultFilter.length,resultFilter);

  }

  private loadItemsWithTotalCount(totalCount,resultSort): void {
    // var resultSort = this.dataRes.slice(this.skip, this.skip + this.pageSize);
    this.gridData = {
      data: resultSort,
      total:totalCount
    };
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
    this.refresh();
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

  extendCredit(e) {
    this.openedExtendCredit = true;
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
  public selectedCreditItemResult: Credit = null;
  public selected(e) {
    //Problem here
    let selectedCredit = new Credit();
    this.disableShowBtn = false;
    this.selectedCreditItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as Credit)
      : new Credit();

    //  this.selectedCreditItemResult.Id=selectedCredit.Id
  }





  // public selectedRowbaseMouseClicked(e) {
  //   //Problem here
  //   let selectedCredit = new Credit();
  //   this.disableShowBtn = false;
  //   this.selectedCreditItemResult = e.dataItem!=undefined
  //     ? (e.dataItem as Credit)
  //     : new Credit();

  //    this.selectedCreditItemResult
  // }

  // public opened = true;
  // public dataSaved = false;

  // public close() {
  //   this.opened = false;
  // }

  // public open() {
  //   this.opened = true;
  // }

  // public submit() {
  //     this.dataSaved = true;
  //     this.close();
  // }

  public showNotifySuccess(da): void {
    this.notificationService.show({
      content: "عملیات با موفقیت صورت پذیرفت",
      height: 40,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "success", icon: true },
      closable: false
    });
  }

  refresh() {
    this.loadingGrid = true;
   this.changeOrdersOptions(this.creditOptentionSelected)
  }
  sendDataToServerLoader = false;
  public showError(err: any): void {
    //   type: 'slide', duration: 400

    this.notificationService.show({


      content: err.error.message,
      height: 40,
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




  releaseCheckStatus = false;
  releaseCheck() {
    this.creditServiceSubscriber = this.creditService
      .releaseCheck(this.selectedCreditItemResult.id)
      .subscribe(
        result => {
          this.releaseCheckStatus = true;
          if (result)
          {
            this.showNotify("امکان آزاد سازی اعتبار مقدور می‌باشد", "success");
          }

          else
            this.showNotify(
              "امکان آزاد سازی اعتبار به دلیل استفاده در تضامین مقدور نمی باشد",
              "warning"
            );
        },
        error => {}
      );
  }

  public showNotify(da, style): void {
    this.notificationService.show({
      content: da,
      height: 40,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: style, icon: true },
      closable: false
    });
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


  private loadItemsBaseFilterChanged(totalCount,data): void {
    // var resultSort = data.slice(0, this.skip + this.pageSize);
    var resultSort = data.slice(0, 12);

    this.gridData = {
      data: resultSort,
      total:totalCount
    };


  }

  checkIsSelectedRow(creditId: number) {

    if (
      this.selectedCreditItemResult == undefined ||
      this.selectedCreditItemResult == null
    )
      return true;


    if (this.selectedCreditItemResult.id == creditId) return false;
    return true;
  }





}
