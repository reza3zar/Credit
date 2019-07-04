import { Customer } from "./../../Models/Misc/Customer";
import { OnInit, Component, Output, EventEmitter } from "@angular/core";
import { AddCreditDecider } from "../../Models/Credit/AddCreditDecider";
import { Broker } from "../../Models/Misc/Broker";
import { CreditType } from "../../Models/Credit/CreditType";
import { CreditRevocationReasonCollection } from "../../Models/Credit/CreditRevocationReason";

@Component({
  selector: "app-credit",
  templateUrl: "./credit.component.html",
  styleUrls: ["./credit.component.css"]
})
export class CreditComponent implements OnInit {
  public creditOptionType = "Warranty";
  public creditType = "Customer";
  public creditRevocationReasonCollection:CreditRevocationReasonCollection=new CreditRevocationReasonCollection();
  public creditDecider: AddCreditDecider;
  public crdType=CreditType;

  @Output() addNewCreditOccourd: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {


    this.creditDecider = new AddCreditDecider();
    this.creditDecider.creditType=CreditType.warranty;
  }

  addNewCreditOccourdFunction(){
    this.addNewCreditOccourd.emit(true);
  }

  public changeCreditsOptions(optType: string): void {
    switch (optType) {
      case "Bond":
        this.creditDecider.creditType = CreditType.bond;
        break;

      case "Cash":
        this.creditDecider.creditType = CreditType.cash;
        break;

      case "Check":
        this.creditDecider.creditType = CreditType.check;
        break;

      case "Warranty":
        this.creditDecider.creditType = CreditType.warranty;
        break;
    }

    this.creditOptionType = optType;
  }

  onCreditTypeChange(state: string): void {
    if (state === "Customer") this.creditDecider.broker = new Broker();
    if (state === "Broker") this.creditDecider.customer = new Customer();

    this.creditType = state;
  }

  public pageIndex = 1;
  onNextPage() {


    if((typeof(this.creditDecider.customer.customerId)==='undefined'||typeof(this.creditDecider.broker.brokerId)==='undefined') && typeof(this.creditDecider.category.id)==='undefined')
      return;

    if(this.pageIndex==2) return;
    this.pageIndex++;
  }

  public onPerviousPage() {
    if (this.pageIndex == 1) return;
    this.pageIndex--;
  }
}
