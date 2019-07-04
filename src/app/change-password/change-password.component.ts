import { LoginServiceService } from './../services/login-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangePass } from '../Models/Misc/ChangePass';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public passObj: ChangePass = new ChangePass();
  public showResult = false;

  changePassForm: FormGroup;
  submitted = false;



  constructor(
    private formBuilder: FormBuilder,
    private service: LoginServiceService,
    private notificationService: NotificationService
    ,private router: Router
  ) {}

  ngOnInit() {
    this.changePassForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }
  sendDataToServer = false;
  get ctrl() {
    return this.changePassForm.controls;
  }

  public changeUserPass() {
    this.submitted = true;
    if (this.changePassForm.invalid) {
      return;
    }


    if(this.passObj.newPassword!=this.passObj.confirmPassword){
      this.showError("رمز عبور جدید با مقدار تکرارش برابر نمی باشد!");
      return;
    }

    if(this.passObj.newPassword.length<6 || this.passObj.newPassword.length>10){
      this.showError("طول شناسه عبور حداقل 6 کاراکتر و حداکثر 10 کاراکتر می‌باشد!");
      return;
    }

    this.sendDataToServer = true;
    this.InquiryServiceSubscriber=this.service.changePassword(this.passObj).subscribe(result=>{
      if(result==true)
      {
        this.showNotifySuccess();
      }
      else{
        this.showError("عملیات با شکست مواجه شد!");
      }
      this.sendDataToServer = false;

    },error=>{
      this.showError(error);
      this.sendDataToServer = false;
    })
  }

  public backToInquiry() {
    this.showResult = false;
  }

  InquiryServiceSubscriber: Subscription;

  ngOnDestroy(): void {
    if (this.InquiryServiceSubscriber !== undefined) {
      this.InquiryServiceSubscriber.unsubscribe();
    }
  }


  public showError(err?: any): void {
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

  public showNotifySuccess(): void {
    this.notificationService.show({
      content: "عملیات با موفقیت صورت پذیرفت",
      height: 40,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "success", icon: true },
      closable: false
    });
  }


}
