import { BaseService } from "../../services/base.service";
import { Router } from "@angular/router";
import {
  SocialLoginData,
  LoginResponse,
  UserDetailsResponse
} from "../../shared/models/auth.model";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { AuthService, SocialUser } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";

@Component({
  selector: "app-social-login",
  templateUrl: "./social-login.component.html",
  styleUrls: ["./social-login.component.css"]
})

/**
 * contain all functionality related to social(facebook, google) login
 */
export class SocialLoginComponent implements OnInit, OnDestroy {
  /**
   * contain logged in user details
   *
   * @var user SocialUser
   */
  public user: SocialUser;

  /**
   * subsciriber of provider response
   */
  public providerResponseSubscribe: any;

  /**
   * subsciriber of api response
   */
  public apiResponseSubscribe: any;

  /**
   * manage dependency injection
   *
   * @param authService Social AuthService
   * @param auth our auth service
   * @param flash FlashMessagesService
   */
  constructor(
    private authService: AuthService,
    public base: BaseService,
    public router: Router
  ) {}

  ngOnInit(): void {
  }
  /**
   * fetch user data from provide
   */
  subscribeResponse() {
    this.providerResponseSubscribe = this.authService.authState.subscribe(
      user => {
        if (user && this.base.auth.checkLoggedIn() === false) {
          this.user = user;
          this.login(user.provider.toLocaleLowerCase());
        }
      }
    );
  }

  /**
   * redirect to google page for authorization
   */
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.subscribeResponse();
  }

  /**
   * redirect to fb page for authorization
   */
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.subscribeResponse();
  }

  /**
   * called social login api
   *
   * @param provider string google|facebok
   */
  login(provider: string) {
    var userData: SocialLoginData = new SocialLoginData();
    userData.name = this.user.name;
    userData.email = this.user.email;
    userData.id = this.user.id;
    userData.image = this.user.photoUrl;

    this.apiResponseSubscribe = this.base.auth.socialLogin(userData, provider).subscribe(
      (response: LoginResponse) => {
        var alertClass =
          response.status === 200 ? "alert-success" : "alert-error";
        if (response.status === 200 && response.auth_token) {
          const userInfoSub = this.base.auth
            .getUserFromToken(response.auth_token)
            .subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              (userData: UserDetailsResponse) => {
                if (userData.status === 200) {
                  this.base.auth.setUserData(userData);
                  this.router.navigate(["/"]);
                  userInfoSub.unsubscribe();
                } else {
                  this.base.showError(userData.status_message);
                  userInfoSub.unsubscribe();
                }
              },
              error => {
                this.base.showError();
              }
            );
        }
        this.base.showMessage(response.status_message, alertClass);
        this.providerResponseSubscribe.unsubscribe();
      },
      error => {
        this.base.showError();
        this.providerResponseSubscribe.unsubscribe();
      }
    );
  }
  ngOnDestroy() {
    if(this.apiResponseSubscribe) {
    this.apiResponseSubscribe.unsubscribe();
    }
  }
}
