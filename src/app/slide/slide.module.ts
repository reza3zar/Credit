import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlideComponent} from "./slide.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SlideComponent,

  ],exports:[
    SlideComponent
  ]
})
export class SlideModule { }
