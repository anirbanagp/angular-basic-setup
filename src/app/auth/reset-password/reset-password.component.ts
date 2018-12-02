import { ActivatedRoute } from "@angular/router";
import { HttpResonseTextWihStatus } from "../../shared/models/auth.model";
import { BaseComponent } from "../../base.componant";
import { BaseService } from "../../services/base.service";
import { Component, OnInit } from "@angular/core";
import { ResetPasswordData } from "../../shared/models/auth.model";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})

/**
 * contain reset password functionality
 *
 * @author Anirban Saha
 */
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  public password: ResetPasswordData = new ResetPasswordData();

  constructor(public base: BaseService, private route: ActivatedRoute) {
    super(base);
    this.base.global.showFooter = false;
    this.base.global.showHeader = false;
    this.route.params.subscribe(params => {
      this.password.token = params.token ? params.token : "";
    });
  }

  ngOnInit() {}
  /**
   * This will call when users submit the form, and call api to register user
   *
   * @return voidis a
   */
  submitForm(): void {
    if (this.password.newpassword && this.password.confirmpassword) {
        this.base.global.showLoader();
      this.base.auth.resetPassword(this.password).subscribe(
        (response: HttpResonseTextWihStatus) => {
        this.base.global.hideLoader();
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
          this.base.global.hideLoader();
          this.base.flash.show("Something went wrong!", {
            cssClass: "alert-error",
            timeout: 3000
          });
        }
      );
    } else {
      this.base.flash.show("Marked fields are mandatory", {
        cssClass: "alert-error",
        timeout: 3000
      });
    }
  }
}
