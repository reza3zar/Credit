import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { credit } from "../../services/credit.service";
import { OnInit, EventEmitter, Output, Input, Component, OnDestroy } from "@angular/core";
import { Credit } from "../../Models/Credit/Credit";
import { SearchCreditDTO } from "../../Models/Credit/SearchCreditDTO";
import { Subscription } from "rxjs";

@Component({
  selector: "app-credits-filter",
  templateUrl: "./credits-filter.component.html",
  styleUrls: ["./credits-filter.component.css"]
})

export class CreditsFilterComponent implements OnInit  , OnDestroy {
  dateCreation: any;
  dueDate: any;

  searchDueDateForm: any;
  searchDueDateTo: any;

  constructor(private credits: credit, private sidebarServ: SidebarService) {}

  @Input()
  creditOption: string = "";

  @Input()
  panelType: string = "";

  @Input()
  creditItemDetail: Credit = new Credit();

  @Output()
  refreshOccured = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  public creditOptionType: string;
  public searchCreditDTO: SearchCreditDTO;

  ngOnInit() {
    // try {
    //   var tempdueDate = moment(this.creditItemDetail.dueDate, "YYYY-M-D")
    //     .locale("fa")
    //     .format("jYYYY-jMM-jDD");
    //   this.dueDate = moment(tempdueDate, "jYYYY,jMM,jDD");

    //   var tempcreationDate = moment(
    //     this.creditItemDetail.creationTime,
    //     "YYYY-M-D"
    //   )
    //     .locale("fa")
    //     .format("jYYYY-jMM-jDD");
    //   this.dateCreation = moment(tempcreationDate, "jYYYY,jMM,jDD");
    // } catch (ex) {
    //   console.error(ex);
    // }
    this.creditOptionType = this.creditOption;
    this.searchCreditDTO = new SearchCreditDTO();
  }

  localSubscriber:Subscription;
  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
    this.formClosed.emit();
  }
  private changeCreditsOptions(creditOption: string) {
    this.credits.getAllCreditsBaseCredittype(creditOption);
    this.refreshOccured.emit("changed");
    this.sidebarServ.toggle("out");
  }

  someAction() {

      var searchCreditDTOResult = new SearchCreditDTO();
      searchCreditDTOResult.bankId = this.searchCreditDTO.bank
        ? this.searchCreditDTO.bank.id
        : null;
      searchCreditDTOResult.brokerId = this.searchCreditDTO.broker
        ? this.searchCreditDTO.broker.brokerId
        : null;
      searchCreditDTOResult.customerId = this.searchCreditDTO.customer
        ? this.searchCreditDTO.customer.customerId
        : null;
      searchCreditDTOResult.creditCategoryId = this.searchCreditDTO
        .creditCategory
        ? this.searchCreditDTO.creditCategory.id
        : null;
      searchCreditDTOResult.branchName = this.searchCreditDTO.branchName
        ? this.searchCreditDTO.branchName
        : null;
      searchCreditDTOResult.minValue = this.searchCreditDTO.minValue
        ? this.searchCreditDTO.minValue
        : null;
      searchCreditDTOResult.maxValue = this.searchCreditDTO.maxValue
        ? this.searchCreditDTO.maxValue
        : null;

      searchCreditDTOResult.dueDate.from = this.searchDueDateForm;
      searchCreditDTOResult.dueDate.to = this.searchDueDateTo;


      // searchCreditDTOResult.dueDate.From = this.searchCreditDTO.dueDate.From[
      //   "selectedDate"
      // ]["utcDateTime"]
      //   ? this.searchCreditDTO.dueDate.From["selectedDate"]["utcDateTime"]
      //   : null;

      // //  searchCreditDTO2.DueDate= this.searchCreditDTO.DueDate['selectedDate.utcDateTime'] ;

  }
}
