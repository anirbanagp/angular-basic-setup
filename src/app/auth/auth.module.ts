import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";

import { LogInComponent } from "./log-in/log-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SocialLoginComponent } from "./social-login/social-login.component";

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedInLoginProvider
} from "angularx-social-login";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { GOOGLE_CLIENT_KEY, FB_CLIENT_KEY } from "./../shared/constant";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      GOOGLE_CLIENT_KEY
      // "558921154887-nm9gm2t0qrm5akpgscpj5meedkk9tuno.apps.googleusercontent.com"
    )
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(FB_CLIENT_KEY)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [CommonModule, SharedModule, AuthRoutingModule, SocialLoginModule],
  declarations: [LogInComponent, SignUpComponent, SocialLoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class AuthModule {}
