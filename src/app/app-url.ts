import { HttpClient } from '@angular/common/http';
// import { BaseRequestOptions } from "@angular/http";

// let basUrl='http://172.16.56.70:9006';

// export const AppUrl = {
//   'logOut':basUrl+'/account/logoff',
//   'products': '/api/products',
//   'reviews': '/api/reviews',
//   'thumbnails': '/api/thumbnails',
//   'categories': basUrl+'/Account/menu',
//   'wishlist': '/api/wishlist',
//   'shoppingCart': '/api/shoppingCart',
//   'countries': '/api/countries',
//   'states': '/api/states',
//   'taxes': '/api/taxes',
//   'users': '/api/users',
//   'usersInfo': '/api/usersInfo',
//   'productsCompare': '/api/productsCompare',
//   'brands':'/api/brands',
//   'customers':basUrl+'/customer',
//   'credit':basUrl+'/credit',
//   'inquiryIsExistCredit':basUrl+'/credit/credit-number-exists?creditNumber=',
//   'broker':basUrl+'/broker',
//   'categoryCredit':basUrl+'/credit-category',
//   'bank':basUrl+'/bank',
//   'login':basUrl+'/account',
//   'letter':basUrl+'/letter',
//   'addLetter':basUrl+'/letter',
//   'tradedOrder':basUrl+'/order/traded-orders',
//   'nottraded':basUrl+'/order/not-traded-orders',
//   'simulateGuarantee':basUrl+'/order/simulate-guarantee',
//   'readytotrade':basUrl+'/order/ready-to-trade-orders',
//   'archivedOrders':basUrl+'/order/archived-orders',
//   'postExtendCredit':basUrl+'/credit/extend',
//   'postRevokeCredit':basUrl+'/credit/revoke',
//   'forceRevoked':basUrl+'/credit/force-revoke',
//   'customersGuaranteeSummary':basUrl+'/customer/customers-Guarantee-Summary',
//   'setCeilingAmountthis':basUrl+'/letter/ceiling-amount',
//    'guarantyeeType':basUrl+'/common/guarantee-types',
//   'accountInfo':basUrl+'/account/info',

//   'customersGuaranteeOrders':basUrl+'/customer/',

//   'expireCredit':basUrl+'/credit/expire',
//   'expireFormalLetter':basUrl+'/letter/expire',
//   'forceRevokeFormalLetter':basUrl+'/letter/force-revoke',
//   'revokeFormalLetter':basUrl+'/letter/revoke',

// };

// // 'categories': 'http://172.16.56.77:1010/ComponentModel',
import { BaseRequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

 export class config{


  constructor(private http:HttpClient) {

  }
  public getJSON(): Observable<any> {
    return this.http.get("./file.json");
}
 }

// let cnfg: config;
// cnfg.getJSON().subscribe(x=>{

// })

  // let basUrl='http://172.16.1.130:9055';
// let basUrl='http://172.16.56.70:9006';
let basUrl='http://172.16.1.36:36000';
 export const AppUrl = {


  'logOut':basUrl+'/account/logoff',
  'products': '/api/products',
  'reviews': '/api/reviews',
  'thumbnails': '/api/thumbnails',
  'categories': basUrl+'/Account/menu',
  'wishlist': '/api/wishlist',
  'shoppingCart': '/api/shoppingCart',
  'countries': '/api/countries',
  'states': '/api/states',
  'taxes': '/api/taxes',
  'users': '/api/users',
  'usersInfo': '/api/usersInfo',
  'productsCompare': '/api/productsCompare',
  'brands':'/api/brands',
  'customers':basUrl+'/customer',
  'credit':basUrl+'/credit',
  'inquiryIsExistCredit':basUrl+'/credit/exists?creditNumber=',
  'broker':basUrl+'/broker',
  'categoryCredit':basUrl+'/credit-category',
  'bank':basUrl+'/bank',
  'login':basUrl+'/account',
  'changePassword':basUrl+'/account/change-password',
  'loginOff':basUrl+'/account/logoff',
  'letter':basUrl+'/letter',
  'addLetter':basUrl+'/letter',
  'tradedOrder':basUrl+'/order/traded',
  'nottraded':basUrl+'/order/not-traded',
  'simulateGuarantee':basUrl+'/order/simulate-guarantee',
  'readytotrade':basUrl+'/order/ready-to-trade',
  'archivedOrders':basUrl+'/order/archived',
  'postExtendCredit':basUrl+'/credit/extend',
  'postRevokeCredit':basUrl+'/credit/revoke',
  'hasDeadlineCredits':basUrl+'/credit/has-deadline',
  'thresholdCredits':basUrl+'/credit/threshold',
  'deActiveCredits':basUrl+'/credit/not-active',
   'inActiveFormalLetter':basUrl+'/letter/inActivate',
   'activeFormalLetter':basUrl+'/letter/activate',
  'forceRevoked':basUrl+'/credit/force-revoke',
  'customersGuaranteeSummary': basUrl +'/guarantee/customer',
  'setCeilingAmountthis':basUrl+'/letter/ceiling-amount',
   'guarantyeeType':basUrl+'/common/guarantee-types',
  'accountInfo':basUrl+'/account/info',
  'orderDetail':basUrl+'/order/',
  'customersGuaranteeOrders':basUrl+'/customer/',
  'inActivate':basUrl+'/credit/inactivate',
  'activate':basUrl+'/credit/activate',
  'expireCredit':basUrl+'/credit/expire',
  'expireFormalLetter':basUrl+'/letter/expire',
  'forceRevokeFormalLetter':basUrl+'/letter/force-revoke',
  'revokeFormalLetter':basUrl+'/letter/revoke',
  'synchronizeOrderByOrderId':basUrl+'/order/sync-order',
  'synchronizeOrders':basUrl+'/order/sync-orders',
  'synchronizeCustomers':basUrl+'/customer/sync-customers',
  'synchronizeBrokers':basUrl+'/broker/sync-brokers',
  'synchronizeExpireDueCredits':basUrl+'/credit/expire-due-credits',
  'synchronizeExpireDuCredits':basUrl+'/letter/expire-due-letters',
  'synchronizeArchiveExpiredOrders':basUrl+'/order/archive-expired-orders',
  'synchronizeDeliverDueTrades':basUrl+'/order/deliver-due-trades',
  'synchronizeExpireDuletters':basUrl+'/letter/expire-due-letters',




};

// 'categories': 'http://172.16.56.77:1010/ComponentModel',
