import { Component, OnInit, OnDestroy } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";

import { AuthService as Auth } from "../../services/auth.service";
import { GlobalService } from "../../services/global.service";
import {
  HttpResonseTextWihStatus,
  UserRegistrationData
} from "../../shared/models/auth.model";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})

/**
 * contain all functionality related to sign up component
 */
export class SignUpComponent implements OnDestroy {
  /**
   * conatin users registration details
   * @var UserRegistrationData
   */
  public registrationData: UserRegistrationData = new UserRegistrationData();
  /**
   * terms and condition agree or not
   */
  public terms_and_condition: boolean = false;

  /**
   * This injected dependency to to component
   *
   * @param global global service
   * @param flash flash message service
   * @param auth auth service
   */
  constructor(
    public global: GlobalService,
    public flash: FlashMessagesService,
    public auth: Auth
  ) {
    this.global.showFooter = false;
    this.global.showHeader = false;
  }

  /**
   * This will call when users submit the form, and call api to register user
   *
   * @return void
   */
  submitForm(): void {
    if (this.validateForm()) {
        this.global.showLoader();
      this.auth.registration(this.registrationData).subscribe(
        (response: HttpResonseTextWihStatus) => {
        this.global.hideLoader();
          var alertClass =
            response.status === 200 ? "alert-success" : "alert-error";
          this.flash.show(response.status_message, {
            cssClass: alertClass,
            timeout: 3000
          });
        },
        error => {
          this.flash.show("Something went wrong!", {
            cssClass: "alert-error",
            timeout: 3000
          });
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
      !this.registrationData.app_user_first_name ||
      this.registrationData.app_user_first_name.length < 4
    ) {
      this.flash.show("First name is too short!", {
        cssClass: "alert-error",
        timeout: 3000
      });
      return false;
    }
    if (
      !this.registrationData.app_user_last_name ||
      this.registrationData.app_user_last_name.length < 4
    ) {
      this.flash.show("Last name is too short!", {
        cssClass: "alert-error",
        timeout: 3000
      });
      return false;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.registrationData.primary_email_address
      )
    ) {
      this.flash.show("Invalid Email address", {
        cssClass: "alert-error",
        timeout: 3000
      });
      return false;
    }

    if (
      !this.registrationData.app_password ||
      this.registrationData.app_password.length < 6
    ) {
      this.flash.show("Password should be minimum 6 charecter", {
        cssClass: "alert-error",
        timeout: 3000
      });
      return false;
    }

    if (!this.terms_and_condition) {
      this.flash.show("Please agree with terms & conditions", {
        cssClass: "alert-error",
        timeout: 30000
      });
      return false;
    }
    return true;
  }

  /**
   * this will check the email, is it unique or not
   */
  checkUniqueEmail() {
    if (this.registrationData.primary_email_address) {
      this.auth
        .checkUniqueEmail({
          primary_email_address: this.registrationData.primary_email_address
        })
        .subscribe(
          (response: HttpResonseTextWihStatus) => {
            if (response.status !== 200) {
              this.flash.show(response.status_message, {
                cssClass: "alert-error",
                timeout: 3000
              });
              this.registrationData.primary_email_address = "";
            }
          },
          error => {
            this.flash.show("Something went wrong!", {
              cssClass: "alert-error",
              timeout: 3000
            });
          }
        );
    }
  }
  /**
   * This will enable header and footer again, so they are visible in other page
   */
  ngOnDestroy() {
    this.global.showFooter = true;
    this.global.showHeader = true;
  }
}
