import { BaseComponent } from "./base.componant";
import { BaseService } from "./services/base.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { OwlModule } from "ngx-owl-carousel";
import { FlashMessagesModule } from "angular2-flash-messages";
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { NgxSelectModule } from "ngx-select-ex";

import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { LandingComponent } from "./landing/landing.component";

import { GlobalService } from "./services/global.service";
import { ApiRouterService } from "./services/api-router.service";
import { AuthService } from "./services/auth.service";
import { BaseApiService } from "./services/base-api.service";
import { PublicGearDetailsComponent } from "./public-gear-details/public-gear-details.component";
import { NoDataFoundComponent } from "./no-data-found/no-data-found.component";
import { GearListComponent } from "./gear-list/gear-list.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, LandingComponent, PublicGearDetailsComponent, NoDataFoundComponent, GearListComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, OwlModule, FlashMessagesModule.forRoot(), AuthModule, SharedModule, IonRangeSliderModule, NgxSelectModule],
  providers: [BaseService, GlobalService, ApiRouterService, AuthService, BaseApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
