import { suburbList, stateList, updateContactInfo } from "./../../shared/constant";
import { BaseService } from "./../../services/base.service";
import { BaseComponent } from "../../base.componant";
import { Component, OnInit } from "@angular/core";
import { usersContactInfo } from "../../shared/constant";
import { StateListOption, SuburbListOption, ContactInfoData } from "./../../shared/models/contact-info";
import * as GeoCode from "geo-coder";

@Component({
  selector: "app-contact-info",
  templateUrl: "./contact-info.component.html",
  styles: []
})
export class ContactInfoComponent extends BaseComponent implements OnInit {
  stateListOption_1: Array<StateListOption>;
  suburbListOption_1: Array<SuburbListOption>;
  suburbListOption_2: Array<SuburbListOption>;
  actionTitle: string = "Add";
  selectedSuburbFieldOptionName: string = "suburbListOption_1";
  show2ndSlot: boolean = false;

  contactInfoData: Array<ContactInfoData> = [];
  contactInfoCountArray: Array<any> = [];
  positions = [];

  constructor(public baseService: BaseService) {
    super(baseService);
    this.contactInfoData[0] = new ContactInfoData();
    this.baseService.global.showLoader();
    this.baseService.baseApi.getUsersContactInfo();
    this.baseService.baseApi.getStateList();
  }

  ngOnInit() {
    let randomLat = Math.random() * 0.0099 + 43.725;
    let randomLng = Math.random() * 0.0099 + -79.7699;
    this.positions.push([randomLat, randomLng]);
    var geoCode = new GeoCode();

    // geolookup example
    geoCode.geolookup("Brampton, Canada").then(result => {
      console.log(result);
    });
  }

  handleApiResponse(data: any) {
    if (data.resulttype === usersContactInfo) {
      this.contactInfoData = this.baseService.global.getContactInfoData(data.result.result);
      this.contactInfoCountArray = new Array(this.contactInfoData.length);
      this.baseService.global.hideLoader();
    }

    if (data.resulttype === suburbList) {
      this[this.selectedSuburbFieldOptionName] = data.result.result;
    }

    if (data.resulttype === stateList) {
      this.stateListOption_1 = data.result.result;
    }

    if (data.resulttype === updateContactInfo) {
      if (data.result.status === 200) {
        this.baseService.global.hideLoader();
        this.baseService.showMessage("successfully updated!");
      }
    }
  }

  addOrRemoveHandler(actionDetails) {
    if (actionDetails.action === "add") {
      this.contactInfoData.push(new ContactInfoData());
    } else {
      this.contactInfoData.splice(actionDetails.index, 1);
    }
    this.contactInfoCountArray = new Array(this.contactInfoData.length);
  }
  updatedValueHandler(updatedValueDetails) {
    if (updatedValueDetails.updatedValue.is_default === true) {
      this.contactInfoData.forEach((element, index) => {
        if (index !== updatedValueDetails.index) {
          element.is_default = false;
        }
      });
    }
    this.contactInfoData[updatedValueDetails.index] = updatedValueDetails.updatedValue;
  }
  updateProfile() {
    let updateData = { token: "", data: [] };
    for (let eachSet of this.contactInfoData) {
      if (eachSet) {
        updateData.data.push(eachSet);
      }
    }
    this.baseService.baseApi.updateContactInfo(updateData);
    this.baseService.global.showLoader();
  }
}
