import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router
} from "@angular/router";
import { Subscription } from "rxjs";
import { InActiveBackgroundService } from "../../in-active-background.service";
import { LocalStorageManagementService } from "../../services/local-storage-management.service";
import { User } from "../../Models/User/User";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../model/category";
import { trigger, state, style } from "@angular/animations";
import { NotificationService } from "@progress/kendo-angular-notification";
declare var $: any;

@Component({
  selector: "app-home-layout",
  templateUrl: "./home-layout.component.html",
  styleUrls: ["./home-layout.component.css"],
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          transform: "translateX(0px)"
        })
      ),
      state(
        "out",
        style({
          transform: "translateX(250px)"
        })
      )
    ])
  ]
})
export class HomeLayoutComponent implements OnInit, OnDestroy {
  public mymenuState: string = "in";
  showSideBarIcon = false;
  changeStateSideBar(val: boolean) {
    this.showSideBarIcon = val;

    if (this.mymenuState === "in") this.mymenuState = "out";
    else this.mymenuState = "in";
  }
  isUserInfoLoaded=false;
  ngOnInit(): void {
    this.backGroundSubscriber = this.inActiveServ.change.subscribe(state => {
      this.state = state;
    });

    // this.errorSubscriber= this.inActiveServ.change.subscribe(errirMsg => {
    //  this.showError(errirMsg);
    // });

    this.localSubscriber = this.service.getUserData().subscribe(user => {
      this.user = user;
      this.isUserInfoLoaded=true;
    });

    this.getCategories();
  }

  user: User = new User();
  localSubscriber: Subscription;
  routerSubscriber: Subscription;

  loading: boolean = false;
  progress: boolean = false;
  state: boolean = false;
  constructor(
    private router: Router,
    private inActiveServ: InActiveBackgroundService,
    private service: LocalStorageManagementService,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {
    this.routerSubscriber = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    });
  }
  private isInActive = false;

  backGroundSubscriber: Subscription;
  errorSubscriber: Subscription;

  ngOnDestroy(): void {
    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    if (this.routerSubscriber !== undefined) {
      this.routerSubscriber.unsubscribe();
    }

    if (this.categoryubscriber !== undefined) {
      this.categoryubscriber.unsubscribe();
    }

    if (this.errorSubscriber !== undefined) {
      this.errorSubscriber.unsubscribe();
    }

  }

  ngAfterViewInit() {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.progress = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.progress = false;
        }
      },
      e => (this.progress = false)
    );
  }

  categories: Category[];

  categoryubscriber: Subscription;
  public menuIsLoad = false;

  getCategories() {
    var dataResult = this.categoryService.categories;
    if (
      this.categoryService.categories !== undefined &&
      this.categoryService.categories.length > 0
    ) {
      this.categories = this.categoryService.categories;
      this.menuIsLoad = true;
      return;
    }

    this.categoryubscriber = this.categoryService
      .getCategories()
      .subscribe(result => {
        this.categories = result;
        this.menuIsLoad = true;
        this.categoryService.categories = this.categories;
      });
  }

  onNavigate(cat: Category) {
    this.router.navigate(["/" + cat.path]);
  }

  public showError(err: any): void {
    this.notificationService.show({
      content: err,
      height: 40,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "error" },
      closable: true
    });
  }
}
