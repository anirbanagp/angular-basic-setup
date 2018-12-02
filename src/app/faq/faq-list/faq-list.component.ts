import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiHandlerComponent } from "../../api-handler.component";
import { BaseService } from "../../services/base.service";
import { getFaqList } from "../../shared/constant";
import { ActivatedRoute } from "@angular/router";
import { FaqDetails, FaqCategory } from "../../shared/models/faq.model";

@Component({
  selector: "app-faq-list",
  templateUrl: "./faq-list.component.html",
  styleUrls: ["./faq-list.component.css"]
})
export class FaqListComponent extends ApiHandlerComponent implements OnInit, OnDestroy {
  public categoryId: string;
  public faqList: Array<FaqDetails> = [];
  public faqCategory: FaqCategory = new FaqCategory();

  constructor(public baseService: BaseService, private route: ActivatedRoute) {
    super(baseService);
    this.baseService.global.showLoader();
    this.baseService.global.showFooter = false;
    this.baseService.global.showHeader = false;
    this.route.params.subscribe(params => {
      this.categoryId = params.id ? params.id : "12";
    });
  }

  ngOnInit() {
    this.baseService.baseApi.getFaqList(this.categoryId);
  }
  handleApiResponse(data: any) {
    if (data.resulttype === getFaqList) {
      this.faqList = data.result.result.list;
      this.faqCategory = data.result.result.category;
      this.baseService.global.hideLoader();
    }
  }
  ngOnDestroy() {
    this.baseService.global.showFooter = true;
    this.baseService.global.showHeader = true;
  }
}
