import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Category} from "../model/category";
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-menu-leftside',
  templateUrl: './category-menu-leftside.component.html',
  styleUrls: ['./category-menu-leftside.component.css']
})
export class CategoryMenuLeftsideComponent implements OnInit,OnDestroy {

  @Input() inputParentId: number;

  categories: Category[];
  isActive: boolean = false;
  subCategories: Category[];
  selectedRow: Number;
  public setClickedRow:  Function;
  subcatId = -1;
  catid = -1;
  public menuIsLoad=false;

  constructor(private categoryService: CategoryService,
              private router: Router,private http:HttpClient) {

    this.setClickedRow = function (index, catId) {
      if (this.selectedRow == index) {
        //collapse Parent
        this.selectedRow = -1;
        this.isActive = false;

        return;
      }

      this.selectedRow = index;
      this.loadSubcategories(catId);
      this.subcatId = catId;
    }

  }
  ngOnInit() {

    this.getCategories();

  }
  categoryubscriber:Subscription;
  ngOnDestroy() {
    if (this.categoryubscriber !== undefined) {
      this.categoryubscriber.unsubscribe();
    }
}


  getCategories() {
  this.categoryubscriber=  this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
      this.menuIsLoad=true;
    });
  }

  loadSubcategories(categoryId: number) {
    this.menuIsLoad=true;
    this.isActive = true;
    this.subCategories = this.categories.filter(x => x.parentId == categoryId);
  }

  hasChildern(categoryId: number) {
    if (!this.categories)
      return false;

    var result = this.categories.filter(x => x.parentId == categoryId);
    return result && result.length > 0 ? true : false;
  }

  onNavigate(cat:Category) {
    // this.router.navigate(['/categories', catId]);
    this.router.navigate(['/'+cat.path]);

  }


  public generateFake(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }




}
