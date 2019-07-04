import { FormGroup, FormBuilder } from '@angular/forms';
import { FormalLetter } from './../../Models/Credit/FormalLetter';
import { LetterService } from './../../services/letter.service';
import { OnInit, Component, OnDestroy } from "@angular/core";

import {
  filterBy,
  SortDescriptor,
  orderBy,
  CompositeFilterDescriptor
} from "@progress/kendo-data-query";



import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";

import { ExcelExportData } from "@progress/kendo-angular-excel-export";
import { NotificationService } from "@progress/kendo-angular-notification";
import { InActiveBackgroundService } from "../../in-active-background.service";
import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { Credit } from "../../Models/Credit/Credit";
import { Subscription } from "rxjs";
import { UpdateLetterCeilingAmountParameters } from '../../Models/Credit/UpdateLetterCeilingAmountParameters';
@Component({
  selector: 'app-formal-letter-management',
  templateUrl: './formal-letter-management.component.html',
  styleUrls: ['./formal-letter-management.component.css']
})
export class FormalLetterManagementComponent implements OnInit, OnDestroy {
  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [];
  public loadingGrid = true;
  public disableBtn = false;
  public disableShowBtn = true;
  public panelTypeEnum: string = "";

  deActiveDescription='';
  activeDescription='';
  revokeDescription='';
  revokeForceDescription='';

  constructor(
    private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private letterService: LetterService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.allData = this.allData.bind(this);
  }

  public pageSize = 12;
  public skip = 0;

  public state = false;
  private dataRes = [];

  public creditOptin = "credit";
  public result;

  public opened: boolean = false;
  public openedActivate: boolean = false;


  public openRevoke: boolean = false;
  public openRevokeForce: boolean = false;
  public revokeModal(status) {
    if (status === "no") {
      this.openRevoke = false;
      return;
    }
    this.creditServiceSubscriber = this.letterService
      .revokeFormalLetter(this.selectedCreditItemResult.id,this.revokeDescription)
      .subscribe(
        data => {
          this.showNotifySuccessDelete(data);
          this.refresh();
        },
        err => {
          this.showErrorDelete(err);
        }
      );
    this.openRevoke = false;
  }

  public revokeModalForce(status) {
    if (status === "no") {
      this.openRevokeForce = false;
      return;
    }
    this.creditServiceSubscriber = this.letterService
      .forceRevokeFormalLetter(this.selectedCreditItemResult.id,this.revokeForceDescription)
      .subscribe(
        data => {
          this.showNotifySuccessDelete(data);
          this.refresh();
        },
        err => {
          this.showErrorDelete(err);
        }
      );
    this.openRevokeForce = false;
  }

  public close(status) {
    if (status === "no") {
      this.opened = false;
      return;
    }
    this.creditServiceSubscriber = this.letterService
      .inActiveFormalLetter(this.selectedCreditItemResult.id,this.deActiveDescription)
      .subscribe(
        data => {
          this.showNotifySuccessDelete(data);
          this.refresh();
        },
        err => {
          this.showErrorDelete(err);
        }
      );
    this.opened = false;
  }

  public activateFormalLetters(status) {
    if (status === "no") {
      this.openedActivate = false;
      return;
    }
    this.creditServiceSubscriber = this.letterService
      .activeFormalLetter(this.selectedCreditItemResult.id,this.activeDescription)
      .subscribe(
        data => {
          this.showNotifySuccessDelete(data);
          this.refresh();
        },
        err => {
          this.showErrorDelete(err);
        }
      );
    this.openedActivate = false;
  }

  public activateFormalLetter(){
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

  public showRevoke() {
    if (
      this.selectedCreditItemResult == null ||
      this.selectedCreditItemResult === undefined
    )
      return;
    this.openRevoke = true;
  }

  public showRevokeForce() {
    if (
      this.selectedCreditItemResult == null ||
      this.selectedCreditItemResult === undefined
    )
      return;
    this.openRevokeForce = true;
  }

  // public showConfirmation() {
  //   const dialog: DialogRef = this.dialogService.open({
  //     title: "فرم تــــاییدیه",
  //     content: " آیا از حذف اطمینان دارید؟",
  //     actions: [{ text: "خیر", primary: true }, { text: "بله" }],
  //     width: 450,
  //     height: 200,
  //     minWidth: 250
  //   });

  //   dialog.result.subscribe(result => {
  //     if (result instanceof DialogCloseResult) {

  //     } else {
  //       // this.showNotifySuccessDelete();
  //       this.creditService.deleteCreditById(1111).subscribe(data => {
  //         this.showNotifySuccessDelete();
  //       },err =>{
  //         this.showErrorDelete(err);
  //       });
  //     }
  //   });
  // }

  public ngOnInit(): void {
    this.requestMaxValueForm = this.formBuilder.group({
      CeilingAmount: ['', ],

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

      this.refresh();
  }

  sidebarSubscriber: Subscription;
  backGroundSubscriber: Subscription;
  creditServiceSubscriber: Subscription;
  creditceilingSubscriber:Subscription
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

    if (this.creditceilingSubscriber !== undefined) {
      this.creditceilingSubscriber.unsubscribe();
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

private loadItems(): void {
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


  public showNotifySuccessDelete(da): void {
    this.notificationService.show({
      content: "عملیات با موفقیت صورت پذیرفت",
      height: 40,
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

      // this.contextItem = e.dataItem;

      // this.gridContextMenu.show({ left: originalEvent.pageX, top: originalEvent.pageY });
    }
  }

  public onSelect({ item }): void {
    // const index = this.gridData.indexOf(this.contextItem);
    // if (item.text === 'جستجوی پیشرفته') {
    // }  if ((item.text === 'مشاهده جزئیات') {
    // }
  }

  public createNewFormalLetter(): void {
    this.typeOpereation = "addNewFormalLetter";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }
  updateLetterCeilingAmountParameters:UpdateLetterCeilingAmountParameters=new UpdateLetterCeilingAmountParameters();
  openedMaxValue=false;

  closeMaxValue(){
    this.openedMaxValue=false;
    this.showErrorMessage=false;
  }

  requestMaxValueForm:FormGroup;
  disabled=true;


  orderOption:string='ultimate';
  public changeOrdersOptions(orderOption: string) {
    this.orderOption=orderOption;
      this.showErrorMessage=false;
      if(orderOption==='ultimate')
      {
        this.disabled=true;

        this.updateLetterCeilingAmountParameters.CeilingAmount=null;
      }
        else
        this.disabled=false;

    }
    sendDataToServer=false;

    showErrorMessage=false;
    onSubmit(){


      if(this.orderOption==='unultimate'&& (this.updateLetterCeilingAmountParameters.CeilingAmount==undefined ||
        this.updateLetterCeilingAmountParameters.CeilingAmount==null|| this.updateLetterCeilingAmountParameters.CeilingAmount.toString().length==0  ) )
      {
        this.showErrorMessage=true;
        return;
      }

      this.updateLetterCeilingAmountParameters.LetterId=this.selectedCreditItemResult.id;
      this.sendDataToServer=true;
      this.creditceilingSubscriber =  this.letterService.setCeilingAmountthis(this.updateLetterCeilingAmountParameters).subscribe(result=>{
        if(result==true)
        {
          this.showNotifySuccess('');
          this.openedMaxValue=false;
          this.refresh()
        }
        this.sendDataToServer=false;


      },err=>{
        this.showError(err);
        this.sendDataToServer=false;
      })

    }


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


    public showNotify(da,style): void {
      this.notificationService.show({
        content:da,
         height: 40,
        animation: { type: "fade", duration: 1000 },
        position: { horizontal: "center", vertical: "top" },
        type: { style: style, icon: true },
        closable: false
      });
    }

    public showError(err: any): void {
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

    showMaxForm(){
      this.openedMaxValue=true;
    }


    releaseCheckStatus=false;
    releaseCheck(){
      this.creditceilingSubscriber = this.letterService.releaseCheck(this.selectedCreditItemResult.id).subscribe(
        result => {
            this.releaseCheckStatus=true;
            if(result)
            this.showNotify('امکان آزاد سازی اعتبار مقدور می‌باشد', "success")
            else
            this.showNotify('امکان آزاد سازی اعتبار به دلیل استفاده در تضامین مقدور نمی باشد',"warning")

    },error=>{
    })
  }



    refresh(){
      this.loadingGrid=true;
      this.creditceilingSubscriber = this.letterService.getAllLetterCollection().subscribe(
        result => {
          this.dataRes = result as FormalLetter[];
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

;
