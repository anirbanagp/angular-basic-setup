import { RESULT_ERROR } from "./shared/constant";
import { Injectable, OnDestroy } from "@angular/core";
import { BaseService } from "./services/base.service";
// tslint:disable-next-line:import-blacklist
import { Subscription } from "rxjs";
import { ApiHandlerComponent } from "./api-handler.component";

@Injectable()
/**
 * main component functionality
 */
export class BaseComponent extends ApiHandlerComponent implements OnDestroy {
  /**
   * manage dependency injcection of services
   * @param baseService GlobalService
   */
  constructor(public baseService: BaseService) {
    super(baseService);
    this.isLoggedIn();
  }

  /**
   * will check if a user logged in or not. if not redirect to login page
   */
  isLoggedIn() {
    if (this.baseService.auth.checkLoggedIn() === true) {
      return true;
    } else {
      this.baseService.router.navigate(["/login"]);
      return false;
    }
  }
}
