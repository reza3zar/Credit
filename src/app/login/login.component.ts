import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { LoginInfo } from '../Models/User/LoginInfo';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { LocalStorageManagementService } from '../services/local-storage-management.service';
declare var $ :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,AfterContentInit, OnDestroy {
  form: FormGroup;
  imgeData:string='';
  constructor(private loginservice:LoginServiceService,private router: Router,private notificationService: NotificationService) { }
  ngOnInit() {
    this.form=new FormGroup({    userName: new FormControl(''),
    password: new FormControl(''),hash: new FormControl(''),});

    this.refreshCaptcha();


  }
  ngAfterContentInit() {

  }

  refreshCaptcha(){
   this.captchaSubscriber= this.loginservice.getCaptcha().subscribe(result=>{
      this.imgeData=result.image;
      this.loginInformation.captchaHash=result.hash;
    });
  }

  public loginInformation:LoginInfo=new LoginInfo();

  public loginToSystem(){
    // this.loginservice.login(this.loginInformation).subscribe((response)=>{
      if(this.loginInformation.username==null||this.loginInformation.username==="" ||this.loginInformation.password==null||this.loginInformation.password===""||
      this.loginInformation.captchaValue==null||this.loginInformation.captchaValue==="")
      {
        this.showErrorLogin("لطفا اطلاعات کاربری را تکمیل نمایید");
        return;
      }

      this.sendDataToServer=true;
      this.localSubscriber=  this.loginservice.login(this.loginInformation).subscribe(data=>{

        this.sendDataToServer=false;

        if(data==true)
        {
          this.router.navigate(['home']);

        }
        else{
          this.refreshCaptcha();
          this.showErrorLogin( "اطلاعات وارد شده، صحیح نمی باشد، دوباره سعی کنید! ");
        }
      },error=>{
        console.log(error);
        this.sendDataToServer=false;
        this.showErrorLogin("بروز خطا در هنگام ورود به سامانه");
      }) ;
  }

  localSubscriber:Subscription;
  captchaSubscriber:Subscription;
  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    if (this.captchaSubscriber !== undefined) {
      this.captchaSubscriber.unsubscribe();
    }
  }
  sendDataToServer=false;
  public showErrorLogin(err: any): void {
    //   type: 'slide', duration: 400
    this.notificationService.show({
      content:
       err

        ,
      animation: { type: "fade", duration: 4000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "error", icon: true },
      closable: false
    });
  }



  }


