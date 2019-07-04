import { Component, OnInit, OnDestroy } from '@angular/core';
import {SiteFeatureService} from "../services/site-feature.service";
import {siteFeature} from "../model/site-feature";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-site-features',
  templateUrl: './site-features.component.html',
  styleUrls: ['./site-features.component.css']
})
export class SiteFeaturesComponent implements OnInit  , OnDestroy {
  siteFeatureCollection:siteFeature[];
  constructor(private siteFeatureService:SiteFeatureService) { }

  ngOnInit() {

    this.localSubscriber=this.siteFeatureService.getSiteFeatures().subscribe(result=>{
       this.siteFeatureCollection=result
    });
  }

  localSubscriber:Subscription;
  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
  }

}
