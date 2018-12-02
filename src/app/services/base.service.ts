import { BaseApiService } from "./base-api.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { GlobalService } from "./global.service";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseService {
  /**
   * manage dependency injection
   * @param global
   * @param flash
   * @param auth
   * @param router
   * @param baseApi
   */
  constructor(
    public global: GlobalService,
    public flash: FlashMessagesService,
    public auth: AuthService,
    public router: Router,
    public baseApi: BaseApiService
  ) {}

  /**
   * show error message
   * @param message
   */
  showError(message = "Something went wrong!") {
    this.flash.show(message, {
      cssClass: "alert-error",
      timeout: 3000
    });
  }

  /**
   * show alert message, by default success message
   * @param message
   * @param alertClass
   */
  showMessage(message = "Something went wrong!", alertClass = "alert-success") {
    this.flash.show(message, {
      cssClass: alertClass,
      timeout: 3000
    });
  }

  
}
