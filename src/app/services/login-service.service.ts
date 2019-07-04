import { Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfo } from '../Models/User/LoginInfo';
import { AppUrl } from '../app-url';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ChangePass } from '../Models/Misc/ChangePass';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private url = AppUrl;
  constructor(private http:HttpClient,private oldHttp:Http) { }

  public login(loginInfo:LoginInfo): Observable<any>{

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'withCredentials': 'true'

    //   })

    // };

    // let hdrs = new HttpHeaders({ 'Content-Type': 'application/json' ,'withCredentials': 'true'});

    // return this.http.post(this.url.login+'/login',loginInfo, { headers: hdrs, observe: 'response' });

    const httpOptions = {
      withCredentials: true,
    };

    return this.http.post(this.url.login+'/login',loginInfo,httpOptions)
  }

  getCaptcha():Observable<any>{
    return this.http.get(this.url.login+'/captcha')
  }

  getUserInformation():Observable<any>{
    return this.http.get(this.url.login+'/info');
  }

  changePassword(pass:ChangePass):Observable<any>{
    return this.http.post(this.url.changePassword,pass);
  }

  logOut(): Observable<any>{
    const httpOptions = {
      withCredentials: true,
    };
   return this.http.post(this.url.loginOff,'',httpOptions);
  }

}
