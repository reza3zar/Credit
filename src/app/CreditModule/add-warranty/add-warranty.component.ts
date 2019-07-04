import { credit } from './../../services/credit.service';
import {
  BrokerWarranty,
  CustomerWarranty
} from "./../../Models/Credit/Warranty";
import { Broker } from "./../../Models/Misc/Broker";
import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from "@angular/core";
import { AddCreditDecider } from "../../Models/Credit/AddCreditDecider";
import { Category } from "../../model/category";
import { Customer } from "../../Models/Misc/Customer";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationService } from '@progress/kendo-angular-notification';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { Subscription } from 'rxjs';


@Component({
  selector: "app-add-warranty",
  templateUrl: "./add-warranty.component.html",
  styleUrls: ["./add-warranty.component.css"]
})
export class AddWarrantyComponent implements OnInit,OnDestroy {
  @Output() addNewCreditOccourd: EventEmitter<boolean> = new EventEmitter();
  credit: CustomerWarranty = new CustomerWarranty();
  // creditForm = new FormGroup({
  //   creditNumber: new FormControl(""),
  //   value: new FormControl(""),
  //   dueDate: new FormControl(""),
  //   issueDate: new FormControl(""),
  //   bankId: new FormControl(""),
  //   branchCode: new FormControl(""),
  //   branchName: new FormControl(""),
  //   address: new FormControl(""),
  //   description: new FormControl("")
  // });
  sendDataToServer=false;
  creditForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private creditService:credit,
    private notificationService: NotificationService,private sideBarServices:SidebarService) {}
  // brk: BrokerWarranty=new BrokerWarranty();
  // cst: CustomerWarranty=new CustomerWarranty();
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
  public closeMe(){
    this.sideBarServices.toggle('out');
  }
  ngOnInit() {


    this.creditForm = this.formBuilder.group({
      creditNumber: ['', Validators.required],
      value: ['', Validators.required],
      bankId: ['', [Validators.required ]],
      branchName: ['', [Validators.required ]],
      dueDate: [''],
      issueDate: [''],
      address: [''],
      description: [''],
      branchCode: ['', [Validators.required ]]
  });

  }

  get ctrl() { return this.creditForm.controls; }

  onSubmit() {
    console.log(this.credit)
    this.submitted = true;


   this.creditForm.controls['issueDate'].setErrors(null);
   this.creditForm.controls['dueDate'].setErrors(null);

   console.log(this.creditForm)

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
      this.sendDataToServer=false;
      return;
    }
    this.opened=false;
    this.saveCredit();


  }

  private saveCredit(){

    this.creditServiceSubscriber= this.creditService.addCredit(this.credit).subscribe(result=>{
      if(result==true)
      {
        this.showNotifySuccessAddWarranty('');
        this.opened=false;
        this.addNewCreditOccourd.emit(true);
        this.sideBarServices.toggle('out')
       this.sendDataToServer=false;

      }

    },err=>{
      this.showError(err);
      this.sendDataToServer=false;


    })
  }

  public showNotifySuccessAddWarranty(da): void {
    this.notificationService.show({
      content: "عملیات با موفقیت صورت پذیرفت",
      height:40,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "success", icon: true },
      closable: false
    });
  }

  public showError(err: any): void {

    this.notificationService.show({
      content:
      err.error.message,
      height:40,
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
