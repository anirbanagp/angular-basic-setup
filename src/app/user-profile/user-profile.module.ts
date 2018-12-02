import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { SharedModule } from "../shared/shared.module";
import { GearComponent } from './profile/gear/gear.component';
import { ReviewComponent } from './profile/review/review.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NotificationComponent } from './notification/notification.component';
import { ConnectSocialComponent } from './connect-social/connect-social.component';
import { DigitalIdComponent } from './digital-id/digital-id.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PrivateGearDetailsComponent } from './private-gear-details/private-gear-details.component';



@NgModule({
  imports: [CommonModule, UserProfileRoutingModule, SharedModule,
  ],
  declarations: [ProfileComponent, EditProfileComponent, GearComponent, ReviewComponent, ContactInfoComponent, LeftSidebarComponent, AccountSettingsComponent, NotificationComponent, ConnectSocialComponent, DigitalIdComponent, InsuranceComponent, PrivateGearDetailsComponent]
})
export class UserProfileModule {}
