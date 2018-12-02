import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiHandlerComponent } from "../../api-handler.component";
import { BaseService } from "../../services/base.service";
import { getFaqCategory } from "../../shared/constant";
import { FaqCategory } from "../../shared/models/faq.model";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"]
})
export class FaqComponent extends ApiHandlerComponent implements OnInit, OnDestroy {
  public faqCategory: Array<FaqCategory> = [];

  constructor(public baseService: BaseService) {
    super(baseService);
    this.baseService.global.showLoader();
    this.baseService.global.showFooter = false;
    this.baseService.global.showHeader = false;
  }

  ngOnInit() {
    this.baseService.baseApi.getFaqCategory();
  }
  handleApiResponse(data: any) {
    if (data.resulttype === getFaqCategory) {
      this.faqCategory = data.result.result;
      this.baseService.global.hideLoader();
    }
  }
  ngOnDestroy() {
    this.baseService.global.showFooter = true;
    this.baseService.global.showHeader = true;
  }
}
