import { HttpResonseTextWihStatus } from "../../shared/models/auth.model";
import { BaseService } from "../../services/base.service";
import { BaseComponent } from "../../base.componant";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  public primary_email_address: string;

  constructor(public base: BaseService) {
    super(base);
    this.base.global.showFooter = false;
    this.base.global.showHeader = false;
  }

  ngOnInit() {}
  /**
   * This will call when users submit the form, and call api to register user
   *
   * @return voidis a
   */
  submitForm(): void {
    alert("hii");
    if (this.validateForm()) {
      this.base.auth.forgotPassword(this.primary_email_address).subscribe(
        (response: HttpResonseTextWihStatus) => {
          var alertClass =
            response.status === 200 ? "alert-success" : "alert-error";
          this.base.flash.show(response.status_message, {
            cssClass: alertClass,
            timeout: 3000
          });
          if (response.status === 200) {
            this.base.router.navigate(["/login"]);
          }
        },
        error => {
          this.base.flash.show("Something went wrong!", {
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
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.primary_email_address
      )
    ) {
      this.base.flash.show("Invalid Email address", {
        cssClass: "alert-error",
        timeout: 3000
      });
      return false;
    }
    return true;
  }
}
