import { Component, OnInit } from "@angular/core";

import * as _moment from "moment";

import { updateProfile } from "./../../shared/constant";
import { BaseComponent } from "../../base.componant";
import { BaseService } from "./../../services/base.service";
import { userProfile, rentalType, professionType } from "../../shared/constant";
import { UserEditProfileData, RentalTypeOption, ProfessionTypeOption } from "../../shared/models/user-profile";

const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styles: []
})
export class EditProfileComponent extends BaseComponent implements OnInit {
  public max: Date = new Date();
  public imageUrl: any;
  public dob = new moment();
  public mentionOtherProfession: boolean = false;
  public rentalType: Array<RentalTypeOption>;
  public professionType: Array<ProfessionTypeOption>;
  public userProfileData: UserEditProfileData = new UserEditProfileData();
  public uploadedFiles: File;

  constructor(public baseService: BaseService) {
    super(baseService);
    this.baseService.global.showLoader();
    this.baseService.baseApi.getProfile();
    this.baseService.baseApi.getRentalType();
    this.baseService.baseApi.getProfessionType();
  }

  ngOnInit() {}
  handleApiResponse(data: any) {
    if (data.resulttype === userProfile) {
      this.userProfileData = data.result.result[0];
      this.imageUrl = this.userProfileData.user_profile_picture_link;
      this.dob = new moment(this.userProfileData.user_birth_date);
      this.baseService.global.hideLoader();
    }

    if (data.resulttype === rentalType) {
      this.rentalType = data.result.result;
    }

    if (data.resulttype === professionType) {
      this.professionType = data.result.result;
      this.professionType.push({ profession_type_id: "-1", profession_name: "other" });
    }

    if (data.resulttype === updateProfile) {
      if (data.result.status === 200) {
        this.baseService.global.hideLoader();
        this.baseService.showMessage("successfully updated!");
        this.userProfileData = data.result.result;
      }
    }
  }

  updateProfile() {
    this.userProfileData.user_birth_date = this.dob.format("YYYY-MM-DD");
    this.baseService.baseApi.updateProfile(this.userProfileData);
    let uploadData = new FormData();
    uploadData.append("image", this.uploadedFiles, this.uploadedFiles.name);
    uploadData.append("type", "profile");
    this.baseService.baseApi.uploadFiles(uploadData);

    this.baseService.global.showLoader();
  }
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userProfileData.user_profile_picture_link = reader.result;
        this.uploadedFiles = <File>event.target.files[0];
        this.imageUrl = reader.result;
      };
    }
  }
  chekProfession() {
    // tslint:disable-next-line:radix
    if (parseInt(this.userProfileData.profession_type_id) === -1) {
      this.mentionOtherProfession = true;
    } else {
      this.mentionOtherProfession = false;
      this.userProfileData.other_profession = "";
    }
  }
}
