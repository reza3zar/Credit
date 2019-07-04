import { SimulateGuaranteeresult } from "./../../Models/Order/simulateGuaranteeResult";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { TemporaryOrderDTO } from "../../Models/Order/TemporaryOrderDTO";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrdersService } from "../../services/orders.service";
import { Subscription } from "rxjs";
import { Customer } from "../../Models/Misc/Customer";
import { Broker } from "../../Models/Misc/Broker";
import { GuaranteeType } from "../../Models/Order/GuaranteeType";

@Component({
  selector: "app-guarantee",
  templateUrl: "./guarantee.component.html",
  styleUrls: ["./guarantee.component.css"]
})
export class GuaranteeComponent implements OnInit, OnDestroy {
  public tempOrder: TemporaryOrderDTO = new TemporaryOrderDTO();
  public simulate: SimulateGuaranteeresult = new SimulateGuaranteeresult();
  public showResult = false;

  creditForm: FormGroup;
  submitted = false;

  public customer: Customer = new Customer();
  public broker: Broker = new Broker();
  public guaranteeType: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: OrdersService
  ) {}

  ngOnInit() {
    this.creditForm = this.formBuilder.group({
      customerValue: ["", Validators.required],
      broker: ["", Validators.required],
      gauranteeType: ["", Validators.required],
      coefficient: ["", Validators.required],
      privilegedToUseBrokerCredit: [""],
      privilegedToUseLetterCredit: [""],
      value: ["", Validators.required]
    });
  }
  sendDataToServer = false;
  get ctrl() {
    return this.creditForm.controls;
  }

  public inquiryGaurantee() {
    if (this.customer.name == undefined)
      this.creditForm.controls["customerValue"].setValue("");

      if (this.broker.name == undefined)
      this.creditForm.controls["broker"].setValue("");


    this.submitted = true;
    if (this.creditForm.invalid) {
      return;
    }
    this.sendDataToServer = true;
    this.tempOrder.customerId = this.customer.customerId;
    this.tempOrder.brokerId = this.broker.brokerId;
    this.tempOrder.guaranteeType = this.guaranteeType.value;
    if (this.tempOrder._privilegedToUseBrokerCredit == undefined)
      this.tempOrder._privilegedToUseBrokerCredit = false;
    if (this.tempOrder._privilegedToUseLetterCredit == undefined)
      this.tempOrder._privilegedToUseLetterCredit = false;

    this.InquiryServiceSubscriber = this.service
      .simulateGuarantee(this.tempOrder)
      .subscribe(result => {
        this.simulate = result;
        this.showResult = true;
        this.sendDataToServer = false;
      });
  }

  public backToInquiry() {
    this.showResult = false;
  }

  InquiryServiceSubscriber: Subscription;

  ngOnDestroy(): void {
    if (this.InquiryServiceSubscriber !== undefined) {
      this.InquiryServiceSubscriber.unsubscribe();
    }
  }
}
