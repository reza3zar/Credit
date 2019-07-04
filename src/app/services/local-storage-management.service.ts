import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './../Models/User/User';
import { Injectable, OnDestroy } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { AppUrl } from '../app-url';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagementService implements OnDestroy {

  constructor( private http:HttpClient) { }
  public url = AppUrl;

  localSubscriber:Subscription;
  localSubscriberUser:Subscription;

  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    if (this.localSubscriberUser !== undefined) {
      this.localSubscriberUser.unsubscribe();
    }
  }

  getUserData():Observable<User>{
    return this.http.get<User>(this.url.accountInfo) ;
  }
  // user:User=undefined;
  // getCurrentUser():Observable< any>{

  //   let valueResult= this.localStorage.getItem<User>('user');
  //    return valueResult;
  // }


}
