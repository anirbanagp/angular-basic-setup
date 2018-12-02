import {
  userInfoGearData,
  userInfoProdutReviews
} from "./../../shared/constant";
import { BaseService } from "./../../services/base.service";
import { BaseComponent } from "../../base.componant";
import { Component, OnInit } from "@angular/core";
import { userInfoForProfile } from "../../shared/constant";
import { UserProfileData } from "../../shared/models/user-profile";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent extends BaseComponent implements OnInit {
  public userProfileData: UserProfileData = new UserProfileData();
  public gearData: any;
  public gearCategries: any = [];
  public gearLists: any = [];
  public reviewLists: any = [];

  constructor(public baseService: BaseService) {
    super(baseService);
    this.baseService.global.showLoader();
    this.baseService.baseApi.getUserInfoForPrfile();
    this.baseService.baseApi.getUserInfoGearData();
    this.baseService.baseApi.getUserInfoProductReviews();
  }
  ngOnInit() {}

  handleApiResponse(data: any) {
    if (data.resulttype === userInfoForProfile) {
      this.userProfileData = data.result.result[0];
      this.baseService.global.hideLoader();
    }
    if (data.resulttype === userInfoGearData) {
      this.gearCategries = data.result.result.gear_categories;
      this.gearLists = data.result.result.gear_lists;
    }
    if (data.resulttype === userInfoProdutReviews) {
      this.reviewLists = data.result.result;
    }
  }
}
