import { Component, OnInit } from "@angular/core";

import { BaseComponent } from "../../base.componant";
import { BaseService } from "./../../services/base.service";
import { getInsuranceDetails, postInsuranceDetails } from "../../shared/constant";

import * as _moment from "moment";
const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: "app-insurance",
  templateUrl: "./insurance.component.html",
  styleUrls: ["./insurance.component.css"]
})
export class InsuranceComponent extends BaseComponent implements OnInit {
  public policy: File;
  public expiration_date = new moment();
  public insuranceDetails = { expire_date: "", insurance_description: "", image_url: "" };

  constructor(public baseService: BaseService) {
    super(baseService);
    this.baseService.global.showLoader();
    this.baseService.baseApi.getInsuranceDetails();
  }

  ngOnInit() {}

  handleApiResponse(data: any) {
    if (data.resulttype === getInsuranceDetails) {
      if (data.result.result && data.result.result.ks_user_certificate_currency_desc) {
        this.insuranceDetails.insurance_description = data.result.result.ks_user_certificate_currency_desc;
        this.insuranceDetails.image_url = data.result.result.image_url;
        this.expiration_date = new moment(data.result.result.ks_user_certificate_currency_exp);
      }
    }
    if (data.resulttype === postInsuranceDetails) {
      this.baseService.showMessage("successfully updated!");
    }
    this.baseService.global.hideLoader();
  }
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.policy = <File>event.target.files[0];
    }
  }
  updatePolicy() {
    this.insuranceDetails.expire_date = this.expiration_date.format("YYYY-MM-DD");
    this.baseService.global.showLoader();
    this.baseService.baseApi.postInsuranceDetails(this.insuranceDetails);
    if (this.policy) {
      let uploadData = new FormData();
      uploadData.append("image", this.policy, this.policy.name);
      uploadData.append("type", "profile_image");
      this.baseService.baseApi.uploadFiles(uploadData);
    }
  }
}
