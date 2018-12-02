import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FaqComponent } from "./faq/faq.component";
import { FaqListComponent } from "./faq-list/faq-list.component";
import { FaqDetailsViewComponent } from "./faq-details-view/faq-details-view.component";

const routes: Routes = [{ path: "list/:id", component: FaqListComponent }, { path: "details/:id", component: FaqDetailsViewComponent }, { path: "", component: FaqComponent }, { path: "**", component: FaqComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule {}
