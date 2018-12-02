import { RESULT_ERROR } from "./shared/constant";
import { Injectable, OnDestroy } from "@angular/core";
import { BaseService } from "./services/base.service";
// tslint:disable-next-line:import-blacklist
import { Subscription } from "rxjs";

@Injectable()
/**
 * main component functionality
 */
export class ApiHandlerComponent implements OnDestroy {
  private apiSubscription: Subscription;
  /**
   * manage dependency injcection of services
   * @param baseService GlobalService
   */
  constructor(public baseService: BaseService) {
    this.apiSubscription = this.baseService.baseApi.apiResults.subscribe(data => {
      if (data.resulttype === RESULT_ERROR) {
        if (data.result.status === 401) {
          this.baseService.auth.logout();
          this.baseService.showError("Session expired! Please Login");
        } else {
          let errorMessage = data.result.status_message ? data.result.status_message : data.result.statusText;

          this.baseService.showError(errorMessage);
        }
      }
      this.handleApiResponse(data);
    });
  }

  /**
   * this will handel all api response, must be override on child component
   * @param data any
   */
  handleApiResponse(data: any) {}

  /**
   * unsubscribe api response subscriber on component destroy
   */
  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }
}
