import { Injectable } from '@angular/core';
import { AppUrl } from '../app-url';
import { HttpClient } from '@angular/common/http';
import { Order } from '../Models/Order/Order';
import { Observable } from "rxjs/Observable";
import { TemporaryOrderDTO } from '../Models/Order/TemporaryOrderDTO';
import { SimulateGuaranteeresult } from '../Models/Order/simulateGuaranteeResult';
import { GuarantyeeType } from '../Models/Misc/Guarantyeetype';
import { OrderParameter } from '../Models/Order/OrderParameter';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public url = AppUrl;
  constructor(private http:HttpClient) { }


  public getReadyToTradeOrdersCollection():Observable<Array<Order>>{
    return this.http.get<Array<Order>>(this.url.readytotrade)
  }

  public getActiveOrdersCollection():Observable<Array<Order>>{
    return this.http.get<Array<Order>>(this.url.activeOrders)
  }

  public getTradedOrdersCollection():Observable<Array<Order>>{
    return this.http.get<Array<Order>>(this.url.tradedOrder)
  }

  public getNotTradedOrdersCollection():Observable<Array<Order>>{
    return this.http.get<Array<Order>>(this.url.nottraded)
  }
  public getArchiveOrdersCollection(pageNumber,pageSize):Observable<any>{

    return this.http.get<any>(this.url.archivedOrders+'?pageNumber='+pageNumber+'&pageSize='+pageSize)
  }

  public simulateGuarantee(tempOrder:TemporaryOrderDTO):Observable<SimulateGuaranteeresult>{

    return this.http.get<SimulateGuaranteeresult>(this.url.simulateGuarantee+'?CustomerId='+tempOrder.customerId+'&BrokerId='+tempOrder.brokerId+'&GuaranteeType='
                                            +tempOrder.guaranteeType+'&Value='+tempOrder.value+'&GuaranteeCoefficient='
                                            +tempOrder.guaranteeCoefficient+'&PrivilegedToUseBrokerCredit='+tempOrder._privilegedToUseBrokerCredit
                                            +'&PrivilegedToUseLetterCredit='+tempOrder._privilegedToUseLetterCredit)
  }

  public getGuarantyee(): Observable<Array<GuarantyeeType>>{
    return  this.http.get<Array<GuarantyeeType>>(this.url.guarantyeeType);
  }


  public getOrderById(orderId:number): Observable<any>{
    return this.http.get<any>(this.url.orderDetail+orderId);
  }

  public synchronizeOrderByOrderId(orderIdItem:number): Observable<any>{
    // console.log(orderIdItem)
    // var orderItems:  OrderParameter =new OrderParameter();
    // orderItems.orderId=orderIdItem.toString();
    return this.http.post<any>(this.url.synchronizeOrderByOrderId,orderIdItem);
  }



  public synchronizeOrders(): Observable<any>{
    return this.http.post<any>(this.url.synchronizeOrders,{});
  }

}
