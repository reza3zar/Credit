import { credit } from './../../services/credit.service';
import { Customer } from "../Misc/Customer";

export class CustomerGuaranteeSummary {
  CustomerGuaranteeSummary() {}

  customerId: number;
  customerName: string;
  totalRequiredGuarantee: number;
  customerShare: number;
  brokerShare: number;
  letterShare: number;
  shortage: number;
  letterCreditString:string;
  credit:number;
  customerResidualCredit:number;
  letterResidualCreditString:string;
}
