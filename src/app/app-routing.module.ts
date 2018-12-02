import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { PublicGearDetailsComponent } from "./public-gear-details/public-gear-details.component";
import { NoDataFoundComponent } from "./no-data-found/no-data-found.component";
import { GearListComponent } from "./gear-list/gear-list.component";

const routes: Routes = [
  {
    path: "profile",
    loadChildren: "app/user-profile/user-profile.module#UserProfileModule"
  },
  {
    path: "faq",
    loadChildren: "app/faq/faq.module#FaqModule"
  },
  { path: "view-gear/:id", component: PublicGearDetailsComponent },
  { path: "no-data-found", component: NoDataFoundComponent },
  { path: "gear-list", component: GearListComponent },
  { path: "", component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
