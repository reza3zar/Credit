import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUrl } from '../app-url';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminTasksService {
  private url = AppUrl;

  constructor(private http: HttpClient) { }

   public synchronizeCustomers():Observable<any>{
    return this.http.post(this.url.synchronizeCustomers,'');
  }


  public synchronizeBrokers():Observable<any>{
    return this.http.post(this.url.synchronizeBrokers,'');
  }


  public synchronizeExpireDueCredits():Observable<any>{
    return this.http.post(this.url.synchronizeExpireDueCredits,'');
  }


  public synchronizeExpireDueletters():Observable<any>{
    return this.http.post(this.url.synchronizeExpireDuletters,'');
  }


  public synchronizeArchiveExpiredOrders():Observable<any>{
    return this.http.post(this.url.synchronizeArchiveExpiredOrders,'');
  }

  public synchronizeDeliverDueTrades():Observable<any>{
    return this.http.post(this.url.synchronizeDeliverDueTrades,'');
  }


  public synchronizeOrderByOrderId(orderIdItem:number): Observable<any>{
    // console.log(orderIdItem)
    // var orderItems:  OrderParameter =new OrderParameter();
    // orderItems.orderId=orderIdItem.toString();
    console.log(this.url.synchronizeOrderByOrderId+orderIdItem)
    return this.http.post<any>(this.url.synchronizeOrderByOrderId,orderIdItem);
  }


}
