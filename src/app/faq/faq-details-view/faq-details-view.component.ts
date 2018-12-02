import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiHandlerComponent } from "../../api-handler.component";
import { BaseService } from "../../services/base.service";
import { ActivatedRoute } from "@angular/router";
import { getFaqDetails } from "../../shared/constant";
import { FaqDetails, FaqCategory } from "../../shared/models/faq.model";

@Component({
  selector: "app-faq-details-view",
  templateUrl: "./faq-details-view.component.html",
  styleUrls: ["./faq-details-view.component.css"]
})
export class FaqDetailsViewComponent extends ApiHandlerComponent implements OnInit, OnDestroy {
  public faqId: string;
  public faqDetails: FaqDetails = new FaqDetails();
  public faqCategory: FaqCategory = new FaqCategory();

  constructor(public baseService: BaseService, private route: ActivatedRoute) {
    super(baseService);
    this.baseService.global.showLoader();
    this.baseService.global.showFooter = false;
    this.baseService.global.showHeader = false;
    this.route.params.subscribe(params => {
      this.faqId = params.id ? params.id : "12";
    });
  }

  ngOnInit() {
    this.baseService.baseApi.getFaqDetails(this.faqId);
  }
  handleApiResponse(data: any) {
    if (data.resulttype === getFaqDetails) {
      this.faqDetails = data.result.result.details;
      this.faqCategory = data.result.result.category;
      this.baseService.global.hideLoader();
    }
  }
  ngOnDestroy() {
    this.baseService.global.showFooter = true;
    this.baseService.global.showHeader = true;
  }
}
