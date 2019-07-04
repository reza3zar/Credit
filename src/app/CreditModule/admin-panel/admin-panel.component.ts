import { AdminTasksService } from "./../../services/admin-tasks.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgSwitch } from "@angular/common";
import { NotificationService } from "@progress/kendo-angular-notification";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"]
})
export class AdminPanelComponent implements OnInit ,OnDestroy{

  ngOnDestroy(): void {
    if (this.syncCustomersSubscriber !== undefined) {
      this.syncCustomersSubscriber.unsubscribe();
    }

    if (this.syncBrokersSubscriber !== undefined) {
      this.syncBrokersSubscriber.unsubscribe();
    }

    if (this.syncOrderByOrderIdSubscriber !== undefined) {
      this.syncOrderByOrderIdSubscriber.unsubscribe();
    }

    if (this.syncExpireDueCreditsSubscriber !== undefined) {
      this.syncExpireDueCreditsSubscriber.unsubscribe();
    }

    if (this.syncExpireDuelettersSubscriber !== undefined) {
      this.syncExpireDuelettersSubscriber.unsubscribe();
    }


  }
  withOrderIdParameter=false;
  orderId:number =0;
  sendDataToServer = false;
  questionStr = " ";
  type="";
  openedActivate = false;
  constructor(private adminService: AdminTasksService , private notificationService: NotificationService) {}

  ngOnInit() {}
  allowToContinue(state): boolean {
    if (state == "no"){
      this.openedActivate = false;
      this.questionStr = "";
      return false;
    }
    this.operationDecider(this.type);
    return true;
  }
  syncCustomersSubscriber: Subscription;
  syncCustomersClicked() {
    this.openedActivate = true;
    this.questionStr = "آیا از به روز رسانی اطلاعات مشتریان اطمینان دارید؟";
    this.type="synchronizeCustomers";
  }
  synchronizeCustomers() {
    this.sendDataToServer = true;

   this.syncCustomersSubscriber= this.adminService.synchronizeCustomers().subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.showError(error);
      } , () =>  {
        this.openedActivate = false;
        this.questionStr = "";
        this.sendDataToServer = false
      }
    );
  }

  syncBrokersSubscriber: Subscription;

  syncBrokersClicked() {
    this.openedActivate = true;
    this.questionStr = "آیا از به روز رسانی اطلاعات کارگزاری‌ها اطمینان دارید؟";
    this.type="synchronizeBrokers";
  }
  synchronizeBrokers() {
    this.sendDataToServer = true;

   this.syncBrokersSubscriber= this.adminService.synchronizeBrokers().subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.showError(error);
      } , () =>  {
        this.openedActivate = false;
        this.questionStr = "";
        this.sendDataToServer = false
      }
    );
  }


  syncOrderByOrderIdSubscriber: Subscription;

  syncOrderByOrderIdClicked() {
    this.openedActivate = true;
    this.withOrderIdParameter=true;
    this.questionStr = "آیا از به روز رسانی اطلاعات سفارش اطمینان دارید؟";
    this.type="synchronizeOrderByOrderId";
  }
  synchronizeOrderByOrderId() {
    this.sendDataToServer = true;

   this.syncOrderByOrderIdSubscriber= this.adminService.synchronizeOrderByOrderId(Number( this.orderId)).subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.showError(error);
      } , () =>  {
        this.openedActivate = false;
        this.questionStr = "";
        this.sendDataToServer = false;
        this.withOrderIdParameter=false;
      }
    );
  }


  operationDecider(type: string) {
    switch (type) {
      case "synchronizeCustomers":
        this.synchronizeCustomers();
        break;

        case "synchronizeBrokers":
        this.synchronizeBrokers();
        break;

        case "synchronizeOrderByOrderId":
        this.synchronizeOrderByOrderId();
        break;

        case "synchronizeExpireDueCredits":
        this.synchronizeExpireDueCredits();
        break;

        case "synchronizeExpireDueletters":
        this.synchronizeExpireDueletters();
        break;

        case "synchronizeArchiveExpiredOrders":
        this.synchronizeArchiveExpiredOrders();
        break;

        case "synchronizeDeliverDueTrades":
        this.synchronizeDeliverDueTrades();
        break;




    }
  }


  syncExpireDueCreditsSubscriber: Subscription;
  syncExpireDueCreditsClicked() {
    this.openedActivate = true;
    this.questionStr = "آیا از انقضای اعتبارات سررسید شده اطمینان دارید؟";
    this.type="synchronizeExpireDueCredits";
  }
  synchronizeExpireDueCredits() {
    this.sendDataToServer = true;

   this.syncCustomersSubscriber= this.adminService.synchronizeExpireDueletters().subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.showError(error);
      } , () =>  {
        this.openedActivate = false;
        this.questionStr = "";
        this.sendDataToServer = false
      }
    );
  }


  syncExpireDuelettersSubscriber: Subscription;
  syncExpireDuelettersClicked() {
    this.openedActivate = true;
    this.questionStr = "آیا از انقضای نامه‌های بالاسری سررسید شده اطمینان دارید؟";
    this.type="synchronizeExpireDueletters";
  }
  synchronizeExpireDueletters() {
    this.sendDataToServer = true;

   this.syncCustomersSubscriber= this.adminService.synchronizeExpireDueCredits().subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.showError(error);
      } , () =>  {
        this.openedActivate = false;
        this.questionStr = "";
        this.sendDataToServer = false
      }
    );
  }


  syncArchiveExpiredOrdersSubscriber: Subscription;
  syncArchiveExpiredOrdersClicked() {
    this.openedActivate = true;
    this.questionStr = "آیا از بایگانی سفارشات غیرفعال اطمینان دارید؟";
    this.type="synchronizeArchiveExpiredOrders";
  }
  synchronizeArchiveExpiredOrders() {
    this.sendDataToServer = true;

   this.syncCustomersSubscriber= this.adminService.synchronizeArchiveExpiredOrders().subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.showError(error);
      } , () =>  {
        this.openedActivate = false;
        this.questionStr = "";
        this.sendDataToServer = false
      }
    );
  }



  syncDeliverDueTradesSubscriber: Subscription;
  syncDeliverDueTradesClicked() {
    this.openedActivate = true;
    this.questionStr = "آیا از تحویل قراردادهای سپری شده اطمینان دارید؟";
    this.type="synchronizeDeliverDueTrades";
  }
  synchronizeDeliverDueTrades() {
    this.sendDataToServer = true;

   this.syncCustomersSubscriber= this.adminService.synchronizeDeliverDueTrades().subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.showError(error);
      } , () =>  {
        this.openedActivate = false;
        this.questionStr = "";
        this.sendDataToServer = false
      }
    );
  }



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


}
