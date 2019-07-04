import { NotFoundComponent } from './../CommonModule/not-found/not-found.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeLayoutComponent } from "../CommonModule/home-layout/home-layout.component";

const routes: Routes = [
  {
    path: "",
    component: HomeLayoutComponent,
    children: [{ path: "", component: HomeComponent },
    { path: "**", component: NotFoundComponent }]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
