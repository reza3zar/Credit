import { Component, OnInit, AfterViewInit } from "@angular/core";
import { TradeSearch } from "../../Models/Credit/tradeSearch";

@Component({
  selector: "app-trades-report",
  templateUrl: "./trades-report.component.html",
  styleUrls: ["./trades-report.component.css"]
})
export class TradesReportComponent implements OnInit  {
   pageloaded=false;
  tradeSearch:TradeSearch=new TradeSearch();
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.pageloaded=true;
    }, 3000);

  }

  searchCustomerTrades(){
    console.log(this.tradeSearch)
  }


}
