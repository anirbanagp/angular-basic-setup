import {
  SocialLoginData,
  UserData,
  UserDetailsResponse
} from "../shared/models/auth.model";
import {
  UserRegistrationData,
  UserLoginData,
  ResetPasswordData
} from "../shared/models/auth.model";
import { Injectable } from "@angular/core";
import { ApiRouterService } from "./api-router.service";
import { AuthService as SocialAuthService } from "angularx-social-login";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams
} from "@angular/http";
import { Router } from "@angular/router";


@Injectable()

/**
 * this will contain all function related to authentication
 */
export class AuthService {
  /**
   * this is log in status for user
   */
  public isLoggedIn: boolean = false;

  /**
   * loggedd in user data
   */
  public userData: UserData = new UserData();
  /**
   * handle dependency injection
   *
   * @param apiRoute api route service
   */
  constructor(
    public apiRoute: ApiRouterService,
    private socialAuth: SocialAuthService,
    public router: Router
  ) {}

  /**
   * call registration api with all data and return response
   *
   * @param data UserRegistrationData
   * @return mixed
   */
  registration(data: UserRegistrationData) {
    const url: string = this.apiRoute.registration;
    return this.apiRoute.http
      .post(url, data)
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      })
      .catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  /**
   * this will call unique email id checking api
   *
   * @param email email id which should be validated
   */
  checkUniqueEmail(email) {
    const url: string = this.apiRoute.checkEmail;
    return this.apiRoute.http
      .post(url, email)
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      })
      .catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  /**
   * this will call login credential
   * @param loginCredentials
   */
  login(loginCredentials: UserLoginData) {
    const url: string = this.apiRoute.login;
    return this.apiRoute.http
      .post(url, loginCredentials)
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      })
      .catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  /**
   * call social login api
   *
   * @param loginData SocialLoginData
   * @param provider string
   */
  socialLogin(loginData: SocialLoginData, provider: string) {
    const url: string =
      provider === "google"
        ? this.apiRoute.googleLogin
        : this.apiRoute.facebookLogin;
    return this.apiRoute.http
      .post(url, loginData)
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      })
      .catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  /**
   * this will call forgot password api, which will sent a mail to users account
   * @param email registered mail id
   */
  forgotPassword(email: string) {
    const url: string = this.apiRoute.forgotPassword;
    return this.apiRoute.http
      .post(url, { primary_email_address: email })
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      })
      .catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  /**
   * this will update users password
   * @param resetPassword ResetPasswordData
   */
  resetPassword(resetPassword: ResetPasswordData) {
    const url: string = this.apiRoute.resetPassword;
    return this.apiRoute.http
      .post(url, resetPassword)
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      })
      .catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }
  /**
   * this will call forgot password api, which will sent a mail to users account
   * @param email registered mail id
   */
  getUserFromToken(auth_token: string) {
    const url: string = this.apiRoute.getUserFromToken;
    return this.apiRoute.http
      .post(url, { token: auth_token })
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      })
      .catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  /**
   * this will set user data into class property to manage logged in activity
   * @param userDetails UserDetailsResponse
   */
  setUserData(userDetails: UserDetailsResponse) {
     this.setDataIntoLocalStorage(userDetails);
     this.setUserDataIntoClassProperty(userDetails);
  }
  setUserDataIntoClassProperty(userDetails: UserDetailsResponse) {
    this.userData.name = userDetails.name;
    this.userData.email = userDetails.email;
    this.userData.auth_token = userDetails.auth_token;
    this.isLoggedIn = true;
  }
  setDataIntoLocalStorage(userDetails: UserDetailsResponse) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('userDetails', JSON.stringify({auth_token: userDetails.auth_token, name : userDetails.name, email : userDetails.email}));
      resolve('1');
    });
  }
  retriveUserdata() {
    let userData = JSON.parse(localStorage.getItem('userDetails'));
    if (userData != null) {
      this.setUserDataIntoClassProperty(userData);
    }
  }
  checkLoggedIn() {
    this.retriveUserdata();
    return this.isLoggedIn;
  }
  /**
   * this will call when user click on log out
   */
  logout() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
