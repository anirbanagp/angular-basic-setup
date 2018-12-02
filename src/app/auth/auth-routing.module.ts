import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LogInComponent } from "./log-in/log-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: "login", component: LogInComponent },
  { path: "login/:type", component: LogInComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "reset-password/:token", component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
