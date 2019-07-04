import { Injectable } from '@angular/core';
import { AppUrl } from '../app-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerGuaranteeSummary } from '../Models/Credit/CustomerGuaranteeSummary';
import { Order } from '../Models/Order/Order';

@Injectable({
  providedIn: 'root'
})
export class CustomersGuaranteeSummaryServiceService {
  public url = AppUrl;
  constructor(private http:HttpClient) { }


  public getAllcustomersGuaranteeSummaryCollection():Observable<Array<CustomerGuaranteeSummary>>{
    return this.http.get<Array<CustomerGuaranteeSummary>>(this.url.customersGuaranteeSummary)
  }

  public getAllcustomersGuaranteeOrderCollection(customerId):Observable<Array<Order>>{
    return this.http.get<Array<Order>>(this.url.customersGuaranteeOrders+customerId+'/guaranteed-orders')
  }
}
