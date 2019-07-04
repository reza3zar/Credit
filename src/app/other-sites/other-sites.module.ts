import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OtherSitesComponent} from "./other-sites.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    OtherSitesComponent,

  ],exports:[
    OtherSitesComponent
  ]
})
export class OtherSiteModule { }
