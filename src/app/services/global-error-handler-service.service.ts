import { Injectable, ErrorHandler, Inject, Injector, NgZone, ɵConsole } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { RedirectToLogin } from "../CommonModule/redirectToLogin.service";


@Injectable()
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }
  private get redirecToLoginHeloer(): RedirectToLogin {
    return this.injector.get(RedirectToLogin);
  }

  handleError(error: any) {


    if (error instanceof HttpErrorResponse) {

      if (error.status === 405 || error.status === 401){

        const routerService = this.injector.get(Router);
        const ngZone = this.injector.get(NgZone);
        ngZone.run(() => {
          routerService.navigate(['login'], { skipLocationChange: true });
        });
        // this.redirecToLoginHeloer.redirectToLoginPage();
      }
      else

      {
      console.error("An error occurred http Type:", error);

      }

    } else {
      console.error("An error occurred:", error);
    }
  }





    // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
    // private get toastrService(): ToastrService {
    //   return this.injector.get(ToastrService);
    // }

    // public handleError(error: any): void {
    //   this.toastrService.error(
    //     "An unexpected error has occurred.",
    //     "Error",
    //     {
    //       closeButton: true,
    //       timeOut: 5000,
    //       onActivateTick: true
    //     }
    //   );

    //   super.handleError(error);
    // }


}
