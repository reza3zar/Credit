import { CustomerCash } from "./../../Models/Credit/Cash";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AddCreditDecider } from "../../Models/Credit/AddCreditDecider";
import { Category } from "../../model/category";
import { Broker } from "../../Models/Misc/Broker";
import { Customer } from "../../Models/Misc/Customer";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { NotificationService } from "@progress/kendo-angular-notification";
import { credit } from "../../services/credit.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-cash",
  templateUrl: "./add-cash.component.html",
  styleUrls: ["./add-cash.component.css"]
})
export class AddCashComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private creditService: credit,
    private notificationService: NotificationService,
    private sideBarServices: SidebarService
  ) {}

  creditForm: FormGroup;
  submitted = false;
  credit: CustomerCash = new CustomerCash();
  @Output() addNewCreditOccourd: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.creditForm = this.formBuilder.group({
      creditNumber: ["", Validators.required],
      value: ["", Validators.required],
      paymentId: ["", Validators.required],
      bankAccountCode: ["", Validators.required],
      bankId: ["", [Validators.required]],
      branchName: ["", [Validators.required]],
      dueDate: [""],
      issueDate: [""],
      address: [""],
      description: [""],
      branchCode: ["", [Validators.required]],
      bankAccountName: ["", [Validators.required]],
      depositorName: ["", [Validators.required]]
    });
  }

  creditServiceSubscriber: Subscription;
  InquiryServiceSubscriber: Subscription;

  ngOnDestroy(): void {
    if (this.InquiryServiceSubscriber !== undefined) {
      this.InquiryServiceSubscriber.unsubscribe();
    }

    if (this.creditServiceSubscriber !== undefined) {
      this.creditServiceSubscriber.unsubscribe();
    }
  }

  get ctrl() {
    return this.creditForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    this.creditForm.controls['issueDate'].setErrors(null);
    this.creditForm.controls['dueDate'].setErrors(null);

    if (this.creditForm.invalid|| this.sendDataToServer==true)  {
      return;
  }
  this.sendDataToServer=true;

  this.credit.category = this.category;
  this.credit.customer = this.customer;


  this.InquiryServiceSubscriber=this.creditService.inquiryCreditNumber(this.credit.creditNumber).subscribe(result=>{
    if(result==true)
    {
      this.opened=true;

      return;
    }
    this.saveCredit();

  },err=>{
    this.showError(err);
    this.sendDataToServer=false;

  })

  }



  public opened: boolean = false;

  public close(status) {
    if (status === "no") {
      this.opened = false;
      this.sendDataToServer = false;
      return;
    }
    this.opened=false;

    this.saveCredit();
  }
  sendDataToServer = false;

  public closeMe() {
    this.sideBarServices.toggle("out");
  }

  private saveCredit() {
    this.creditServiceSubscriber = this.creditService
      .addCredit(this.credit)
      .subscribe(
        result => {

          if (result == true) {
            this.showNotifySuccessAddWarranty("");
            this.opened = false;
            this.addNewCreditOccourd.emit(true);
            this.sideBarServices.toggle("out");
            this.sendDataToServer = false;
          }
        },
        err => {
          this.showError(err);
          this.sendDataToServer = false;
        }
      );
  }

  public showNotifySuccessAddWarranty(da): void {
    this.notificationService.show({
      content: "عملیات با موفقیت صورت پذیرفت",
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "success", icon: true },
      closable: false
    });
  }

  public showError(err: any): void {
    //   type: 'slide', duration: 400
    this.notificationService.show({
      content: err.error.message,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "error" },
      closable: true
    });
  }

  @Input() category: Category;
  @Input() broker: Broker;
  @Input() customer: Customer;
}
