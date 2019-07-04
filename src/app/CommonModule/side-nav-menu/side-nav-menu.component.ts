import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../model/category';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.css']
})
export class SideNavMenuComponent implements OnInit,OnDestroy {
  constructor(private categoryService: CategoryService,private router: Router,private loginservice:LoginServiceService) {
  }


  setClickedRow (index :number) {
    this.selectedRow = index ;

  }


  ngOnDestroy(): void {
    if (this.categoryubscriber !== undefined) {
      this.categoryubscriber.unsubscribe();
    }
    if (this.loginSubscriber !== undefined) {
      this.loginSubscriber.unsubscribe();
    }


  }

  logOff(){
  this.loginSubscriber=  this.loginservice.logOut().subscribe(rex=>{
    this.router.navigate(['login']);
    });
  }

  changeUserPass(){
    this.router.navigate(['changepassword']);
  }


  categories: Category[];
  selectedRow: number;

  ngOnInit() {
    this.getCategories();

  }
  categoryubscriber:Subscription;
  loginSubscriber:Subscription;

  public menuIsLoad=false;

  getCategories() {
    var dataResult= this.categoryService.categories;
    if( this.categoryService.categories!==undefined && this.categoryService.categories.length>0)
    {
      this.categories = this.categoryService.categories;
      this.menuIsLoad=true;
      return;
    }

    this.categoryubscriber=  this.categoryService.getCategories().subscribe(result => {
        this.categories = result;
        this.menuIsLoad=true;
        this.categoryService.categories=this.categories;
      });
    }

    public generateFake(count: number): Array<number> {
      const indexes = [];
      for (let i = 0; i < count; i++) {
        indexes.push(i);
      }
      return indexes;
    }

    onNavigate(cat:Category) {
      // this.router.navigate(['/categories', catId]);
      this.router.navigate(['/'+cat.path]);

    }

}
