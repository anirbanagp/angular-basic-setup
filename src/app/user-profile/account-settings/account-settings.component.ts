import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../base.componant";
import { BaseService } from "./../../services/base.service";
import { getAccountSettings, postAccountSettings } from "../../shared/constant";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: ["./account-settings.component.css"]
})
export class AccountSettingsComponent extends BaseComponent implements OnInit {
  notificationStatus: boolean = false;

  constructor(public baseService: BaseService) {
    super(baseService);
    this.baseService.global.showLoader();
  }

  ngOnInit() {
    this.baseService.baseApi.getAccountSettings();
  }

  handleApiResponse(data: any) {
    if (data.resulttype === getAccountSettings) {
      this.notificationStatus =
        data.result.result.notification === "No" ? false : true;
      this.baseService.global.hideLoader();
    }
    if (data.resulttype === postAccountSettings) {
      if (data.result.status_code === 200) {
        this.baseService.global.hideLoader();
        this.baseService.showMessage(data.result.status_message);
      }
    }
  }
  updateAccountSettings() {
    let accountData = !this.notificationStatus === false ? "No" : "Yes";
    this.baseService.baseApi.postAccountSettings({ notification: accountData });
    this.baseService.global.showLoader();
  }
}
