import { FlashMessagesService } from "angular2-flash-messages";
import * as con from "./../shared/constant";
import { AuthService } from "./auth.service";
import { ApiRouterService } from "./api-router.service";
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { REQUEST_GET, REQUEST_POST, RESULT_ERROR } from "../shared/constant";
import { RequestOptions } from "@angular/http";
import { Headers, Http } from "@angular/http";
import { UserEditProfileData } from "../shared/models/user-profile";
import { ContactInfoData } from "../shared/models/contact-info";

@Injectable()
export class BaseApiService {
  /**
   * contain api response
   */
  private _result: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  /**
   * manage dependency injection
   * @param http
   * @param apiRoute
   * @param auth
   * @param flash
   */
  constructor(
    //  public http: Http,
    public apiRoute: ApiRouterService,
    public auth: AuthService,
    public flash: FlashMessagesService
  ) {}

  /**
   * manage all api calling
   * @param url api endpoint
   * @param rtype constant of unique request. you can identify a response by this
   * @param bodydata optional, post data
   * @param requesttype constat of GET, POST
   */
  public genericApiCall(url, rtype: string, bodydata: any = null, requesttype: string = REQUEST_GET, json: boolean = true) {
    switch (requesttype) {
      case REQUEST_GET:
        this.apiRoute.http.get(url).subscribe(
          data => {
            this._result.next({ resulttype: rtype, result: data.json() });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;

      case REQUEST_POST:
        bodydata = bodydata ? bodydata : {};
        bodydata.token = this.auth.userData.auth_token;
        var headers = this.apiRoute.getHeader(json);
        this.apiRoute.http.post(url, bodydata, { headers: headers }).subscribe(
          data => {
            this._result.next({ resulttype: rtype, result: data.json() });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;
    }
  }

  /**
   * handle http error response
   * @param error
   * @param requestid
   */
  private handleError(error: any, requestid: string) {
    this._result.next({
      resulttype: RESULT_ERROR,
      result: error,
      requestid: requestid
    });
  }

  /**
   * observer of api response
   */
  get apiResults() {
    return this._result.asObservable();
  }

  /**
   * call userinfo for profile page api
   */
  getUserInfoForPrfile() {
    const url = this.apiRoute.userInfoForProfile;
    this.genericApiCall(url, con.userInfoForProfile, null, REQUEST_POST);
  }
  /**
   * call userinfo for profile page api
   */
  getProfile() {
    const url = this.apiRoute.userInfoForProfile;
    this.genericApiCall(url, con.userProfile, null, REQUEST_POST);
  }
  /**
   * call gear details api for profile page
   */
  getUserInfoGearData() {
    const url = this.apiRoute.userInfoGearData;
    this.genericApiCall(url, con.userInfoGearData, null, REQUEST_POST);
  }

  /**
   * call products reviews for profile page
   */
  getUserInfoProductReviews() {
    const url = this.apiRoute.userInfoProdutReviews;
    this.genericApiCall(url, con.userInfoProdutReviews, null, REQUEST_POST);
  }

  /**
   * call rental type option api
   */
  getRentalType() {
    const url = this.apiRoute.rentalType;
    this.genericApiCall(url, con.rentalType);
  }

  getProfessionType() {
    const url = this.apiRoute.professionType;
    this.genericApiCall(url, con.professionType);
  }
  updateProfile(userProfileData: UserEditProfileData) {
    const url = this.apiRoute.updateProfile;
    this.genericApiCall(url, con.updateProfile, userProfileData, REQUEST_POST);
  }

  getStateList() {
    const url = this.apiRoute.stateList;
    this.genericApiCall(url, con.stateList);
  }

  getSuburbsList(stateId: string) {
    const url = this.apiRoute.suburbList + stateId;
    this.genericApiCall(url, con.suburbList);
  }

  getUsersContactInfo() {
    const url = this.apiRoute.usersContactInfo;
    this.genericApiCall(url, con.usersContactInfo, null, REQUEST_POST);
  }
  updateContactInfo(contactInfoData) {
    const url = this.apiRoute.updateContactInfo;
    this.genericApiCall(url, con.updateContactInfo, contactInfoData, REQUEST_POST);
  }

  getAccountSettings() {
    const url = this.apiRoute.getAccountSettings;
    this.genericApiCall(url, con.getAccountSettings, null, REQUEST_POST);
  }

  postAccountSettings(accountSettingsData) {
    const url = this.apiRoute.postAccountSettings;
    this.genericApiCall(url, con.postAccountSettings, accountSettingsData, REQUEST_POST);
  }

  getNotificationSettings() {
    const url = this.apiRoute.getNotificationSettings;
    this.genericApiCall(url, con.getNotificationSettings, null, REQUEST_POST);
  }

  postNotificationSettings(notificationSettingsData) {
    const url = this.apiRoute.postNotificationSettings;
    this.genericApiCall(url, con.postNotificationSettings, notificationSettingsData, REQUEST_POST);
  }

  getPublicGearDetails(id: any) {
    const url = this.apiRoute.getPublicGearDetails + id;
    this.genericApiCall(url, con.getPublicGearDetails, null, REQUEST_POST);
  }
  getPrivateGearDetails(id: any) {
    const url = this.apiRoute.getPrivateGearDetails + id;
    this.genericApiCall(url, con.getPrivateGearDetails, null, REQUEST_POST);
  }
  uploadFiles(files: any) {
    const url = this.apiRoute.uploadFiles;
    this.genericApiCall(url, con.uplaodFiles, files, REQUEST_POST, false);
  }
  getInsuranceDetails() {
    const url = this.apiRoute.getInsuranceDetails;
    this.genericApiCall(url, con.getInsuranceDetails, null, REQUEST_POST);
  }
  postInsuranceDetails(insuranceDetails: any) {
    const url = this.apiRoute.postInsuranceDetails;
    this.genericApiCall(url, con.postInsuranceDetails, insuranceDetails, REQUEST_POST);
  }
  getAllGearCategory() {
    const url = this.apiRoute.getAllGearCategory;
    this.genericApiCall(url, con.getAllGearCategory);
  }
  getAllGearSubCategory(gearCategoryId: string) {
    const url = this.apiRoute.getAllGearSubCategory + "?gear_category_id=" + gearCategoryId;
    this.genericApiCall(url, con.getAllGearSubCategory);
  }

  getAllGearBrand() {
    const url = this.apiRoute.getAllGearBrand;
    this.genericApiCall(url, con.getAllGearBrand);
  }

  getAllModelsOfBrand(brandId: string) {
    const url = this.apiRoute.getAllModelsOfBrand + "?brand_id=" + brandId;
    this.genericApiCall(url, con.getAllModelsOfBrand);
  }

  getModelDetails(modelDetails) {
    const url = this.apiRoute.getModelDetails;
    this.genericApiCall(url, con.getModelDetails, modelDetails, REQUEST_POST);
  }
  addGearList(gearListData) {
    const url = this.apiRoute.addGearList;
    this.genericApiCall(url, con.addGearList, gearListData, REQUEST_POST);
  }
  addGearImage(imagesObj) {
    const url = this.apiRoute.addGearImage;
    this.genericApiCall(url, con.addGearImage, imagesObj, REQUEST_POST, false);
  }
  getGearListItems() {
    const url = this.apiRoute.getGearListItems;
    this.genericApiCall(url, con.getGearListItems);
  }
  getFaqCategory() {
    const url = this.apiRoute.getFaqCategory;
    this.genericApiCall(url, con.getFaqCategory);
  }
  getFaqList(categoryId) {
    const url = this.apiRoute.getFaqList + categoryId;
    this.genericApiCall(url, con.getFaqList);
  }
  getFaqDetails(faqId) {
    const url = this.apiRoute.getFaqDetails + faqId;
    this.genericApiCall(url, con.getFaqDetails);
  }
}
