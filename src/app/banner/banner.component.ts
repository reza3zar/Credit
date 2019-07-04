import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Banner} from "../model/banner";
import {BannerService} from "../services/banner.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit , OnDestroy {
  banners: Banner[];
  @Input() bannerState: number
  constructor(private bannerService: BannerService) {
  }

  ngOnInit() {
    this.getBannersByState();
  }
  banerSubscriber:Subscription;
  ngOnDestroy() {
    if (this.banerSubscriber !== undefined) {
      this.banerSubscriber.unsubscribe();
    }
}

  getBannersByState() {
   this.banerSubscriber= this.bannerService.getBanners(this.bannerState)
      .subscribe(result => this.banners = result);
  }

}
