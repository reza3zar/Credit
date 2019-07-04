import {AfterContentInit, Component, OnInit, OnDestroy} from '@angular/core';
import {Category} from "../model/category";
import {Router} from "@angular/router";
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-menu-top',
  templateUrl: './category-menu-top.component.html',
  styleUrls: ['./category-menu-top.component.css']
})
export class CategoryMenuTopComponent implements OnInit, OnDestroy{

  categories:Category[];
parents:Category[];


  constructor(private categoryService:CategoryService,private router:Router) { }

  ngOnInit() {
    this.getAllCategories();
  }

  categoryubscriber:Subscription;
  ngOnDestroy() {
    if (this.categoryubscriber !== undefined) {
      this.categoryubscriber.unsubscribe();
    }
}

  getAllCategories(){
   this.categoryubscriber= this.categoryService.getCategories().subscribe(result=>{
      this.categories=result ;
      this.parents=this.categories.filter(c=>c.parentId===0);

    });
  }
  onNavigate(category:Category){
    this.router.navigate(['/'+category.path]);
  }




}
