import { User } from './../Models/User/User';
import { Component, OnInit } from "@angular/core";
import { LoginServiceService } from "../services/login-service.service";
import { Subscription } from "rxjs";
import { LocalStorageManagementService } from "../services/local-storage-management.service";
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private loginservice: LoginServiceService,
    private service: LocalStorageManagementService ,
  ) {



  }

  user:User=new User();
  localSubscriber: Subscription;
  localSubscriber2: Subscription;

  ngOnInit() {

    this.localSubscriber2= this.service.getUserData().subscribe((user) => {

    this.user=user;

    });


    // this.wishListService.addEvent.subscribe(result => {
    //   this.wishListCount += result;
    // });
    //
    // this.shoppingCartService.addEvent.subscribe(result => {
    //   this.shoppingCartCount += result;
    // });
    //
    // this.userInfoService.loginEvent.subscribe(result => {
    //   if (result)
    //     this.userInfo = result;
    //   else
    //     this.userInfo = null;
    // });
  }

  logOut() {
    this.loginservice.logOut();
  }

  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    if (this.localSubscriber2 !== undefined) {
      this.localSubscriber2.unsubscribe();
    }
  }
}
