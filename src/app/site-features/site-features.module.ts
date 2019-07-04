import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiteFeaturesComponent} from "./site-features.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SiteFeaturesComponent
  ],exports:[
    SiteFeaturesComponent
  ]
})
export class SiteFeaturesModule { }
