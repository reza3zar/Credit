///<reference path="../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import { Component, OnInit, OnDestroy } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import { InActiveBackgroundService } from './in-active-background.service';
import { Subscription } from 'rxjs';
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent  implements OnInit, OnDestroy{
  ngOnInit(): void {
    this.backGroundSubscriber= this.inActiveServ.change.subscribe(state=>
      {
        this.state=state;
      }
    );




  }
  progress: boolean = false;
  state:boolean=false;
  constructor(private router: Router,private inActiveServ:InActiveBackgroundService){

  }
  private isInActive=false;

  backGroundSubscriber:Subscription;

  ngOnDestroy(): void {
    this.backGroundSubscriber.unsubscribe();
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progress = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.progress = false;
      }
    }, e => (this.progress = false));
  }

}
