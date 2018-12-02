import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";

@Injectable()

/**
 * this will contain all api list for this app
 */
export class ApiRouterService {
  /**
   * contain api base url
   */
  public apiUrl: string = "http://www.inferasolz.com/kitshare/server/";

  /**
   * contain user registraion api url
   */
  public registration: string = this.apiUrl + "registration";

  /**
   * contain unique email checkin api url
   */
  public checkEmail: string = this.apiUrl + "registration/check_email";

  /**
   * contain login api url
   */
  public login: string = this.apiUrl + "login";

  /**
   * contain google login api
   */
  public googleLogin: string = this.apiUrl + "socialmedia_login/gmail";

  /**
   * contain fb login api
   */
  public facebookLogin: string = this.apiUrl + "socialmedia_login/facebook";

  /**
   * contain forgot password api
   */
  public forgotPassword: string = this.apiUrl + "forget_password";
  /**
   * contain forgot password api
   */
  public resetPassword: string = this.apiUrl + "resetpassword";

  /**
   * contain get user details from token api
   */
  public getUserFromToken: string = this.apiUrl + "user_info/user_credentials";

  /**
   * contain user profile data api for profile page
   */
  public userInfoForProfile: string = this.apiUrl + "user_info/profile_data";

  /**
   * contain gear data api
   */
  public userInfoGearData: string = this.apiUrl + "user_info/gear_data";

  /**
   * contain product review api
   */
  public userInfoProdutReviews: string = this.apiUrl + "user_info/product_reviews";

  /**
   * contain user profile data api for profile page
   */
  public userProfile: string = this.apiUrl + "profile/profile_info";

  /**
   * contain rental type api
   */
  public rentalType: string = this.apiUrl + "pre_fill/rentaltype";

  /**
   * contain profession type api
   */
  public professionType: string = this.apiUrl + "pre_fill/profession_types";

  /**
   * contain profile update api
   */
  public updateProfile: string = this.apiUrl + "user_info/modify_data";

  /**
   * contain state list type api
   */
  public stateList: string = this.apiUrl + "pre_fill/StateList";

  /**
   * contain Suburbs list type api
   */
  public suburbList: string = this.apiUrl + "pre_fill/SuburbsList?state_id=";

  /**
   * contain Suburbs list type api
   */
  public usersContactInfo: string = this.apiUrl + "ProfilepageDetails/GetUseraddress";

  public updateContactInfo: string = this.apiUrl + "ProfilepageDetails/Adduseraddress";

  public getAccountSettings: string = this.apiUrl + "ProfilepageDetails/accounsettingget";

  public postAccountSettings: string = this.apiUrl + "ProfilepageDetails/accounsettingadd";

  public getNotificationSettings: string = this.apiUrl + "ProfilepageDetails/Getnotifcationlist";

  public postNotificationSettings: string = this.apiUrl + "ProfilepageDetails/UserNotificatonSetting";

  public getPublicGearDetails: string = this.apiUrl + "Gear_listing/SignleGearList/";

  public getPrivateGearDetails: string = this.apiUrl + "gear_listing/privategearDetails/";

  public uploadFiles: string = this.apiUrl + "ProfilepageDetails/ImageUpload";
  // public uploadFiles: string = "http://localhost/testapi.php";

  public getInsuranceDetails: string = this.apiUrl + "ProfilepageDetails/getInsurance";

  public postInsuranceDetails: string = this.apiUrl + "ProfilepageDetails/addInsurance";

  public getAllGearCategory: string = this.apiUrl + "Gear_listing/Categorylist";

  public getAllGearSubCategory: string = this.apiUrl + "Gear_listing/Subcategorylist";

  public getAllGearBrand: string = this.apiUrl + "Gear_listing/brandlist";

  public getAllModelsOfBrand: string = this.apiUrl + "Gear_listing/getModallist";

  public getModelDetails: string = this.apiUrl + "Gear_listing/ModelDetails";

  public addGearList: string = this.apiUrl + "Gear_listing/addGearList";

  public addGearImage: string = this.apiUrl + "Gear_listing/GearImageUpload";

  public getGearListItems: string = this.apiUrl + "Gear_listing/GetGearlist";

  public getFaqCategory: string = this.apiUrl + "Gear_listing/FAQCatgoryList";

  public getFaqList: string = this.apiUrl + "Gear_listing/GetFaqList?category_id=";

  public getFaqDetails: string = this.apiUrl + "Gear_listing/GetFaqDetails?faq_id=";

  /**
   * manage dependency injection
   * @param http Http
   */
  constructor(public http: Http) {}

  /**
   * this will add header on each http request
   */
  getHeader(json: boolean = true) {
    let headers = new Headers();
    if (json === true) {
      headers.append("Content-Type", "application/json");
    } else {
      // headers.append("Content-Type", "multipart/form-data");
    }
    return headers;
  }
}
