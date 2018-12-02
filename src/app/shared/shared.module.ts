import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS } from "ng-pick-datetime";
import { OwlMomentDateTimeModule } from "ng-pick-datetime-moment";
import { MY_MOMENT_FORMATS } from "./moments-format.constant";
import { NguiMapModule } from "@ngui/map";
import { GOOGLE_API_KEY } from "./../shared/constant";
import { NgxSelectModule } from "ngx-select-ex";
import { ExtraItemComponent } from "./component/extra-item/extra-item.component";
import { AddressComponent } from "./component/address/address.component";
import { SuggestionBoxComponent } from "./component/suggestion-box/suggestion-box.component";
import { AddressReadonlyComponent } from "./component/address-readonly/address-readonly.component";

@NgModule({
  imports: [FormsModule, NgxSelectModule, CommonModule, HttpClientModule, HttpModule, NguiMapModule.forRoot({ apiUrl: "https://maps.google.com/maps/api/js?key=" + GOOGLE_API_KEY })],
  declarations: [ExtraItemComponent, AddressComponent, SuggestionBoxComponent, AddressReadonlyComponent],
  providers: [HttpClientModule, { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS }],
  exports: [FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, NguiMapModule, NgxSelectModule, ExtraItemComponent, AddressComponent, SuggestionBoxComponent, AddressReadonlyComponent]
})
export class SharedModule {}
