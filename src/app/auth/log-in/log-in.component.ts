import { BaseService } from "../../services/base.service";
import {
  LoginResponse,
  UserData,
  UserDetailsResponse
} from "../../shared/models/auth.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserLoginData } from "../../shared/models/auth.model";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})

/**
 * contain all functionality related to login component
 */
export class LogInComponent implements OnInit, OnDestroy {
  /**
   * contain login credentials
   *
   * @var  loginData  UserLoginData
   */
  public loginData: UserLoginData = new UserLoginData();

  public urlParam: string = "";

  /**
   * This injected dependency to to component
   *
   * @param global global service
   * @param flash flash message service
   * @param auth auth service
   */
  constructor(
    public base: BaseService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.base.global.showFooter = false;
    this.base.global.showHeader = false;
    this.route.params.subscribe(params => {
      this.urlParam = params.type ? params.type : "";
    });
  }

  ngOnInit(): void {
    if (this.base.auth.checkLoggedIn() === true) {
      this.router.navigate(["/"]);
    }
    if (this.urlParam !== "") {
      var alertClass =
        this.urlParam === "success" ? "alert-success" : "alert-error";
      var alertMessage =
        this.urlParam === "success"
          ? "Your account successfully verified. Please Login"
          : "Your account is not activated yet!";

      this.base.flash.show(alertMessage, {
        cssClass: alertClass,
        timeout: 3000
      });
    }
  }

  /**
   * This will call when users submit the form, and call api to register user
   *
   * @return void
   */
  submitForm(): void {
    if (this.validateForm()) {
        this.base.global.showLoader();
      this.base.auth.login(this.loginData).subscribe(
        (response: LoginResponse) => {
          var alertClass =
            response.status === 200 ? "alert-success" : "alert-error";
          if (response.status === 200 && response.auth_token) {
            const userInfoSub = this.base.auth
              .getUserFromToken(response.auth_token)
              .subscribe(
                (userData: UserDetailsResponse) => {
                  if (userData.status === 200) {
                    this.base.auth.setUserData(userData);
                    this.base.global.hideLoader();
                    this.router.navigate(["/"]);
                    userInfoSub.unsubscribe();
                  } else {
                    this.base.showError(userData.status_message);
                    userInfoSub.unsubscribe();
                  }
                },
                error => {
                  this.base.global.hideLoader();
                  this.base.showError();
                }
              );
          }
          this.base.showMessage(response.status_message, alertClass);
        },
        error => {
          this.base.showError();
        }
      );
    }
  }
  /**
   * This will called from submitFor function to validate users input
   * before sending them to server
   */
  validateForm() {
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.loginData.primary_email_address
      )
    ) {
      this.base.showError("Invalid Email address");
      return false;
    }

    if (
      !this.loginData.app_password ||
      this.loginData.app_password.length < 6
    ) {
      this.base.showError("Password should be minimum 6 charecter");
      return false;
    }
    return true;
  }

  /**
   * this will enable header and footer again
   */
  ngOnDestroy() {
    this.base.global.showFooter = true;
    this.base.global.showHeader = true;
  }
}
