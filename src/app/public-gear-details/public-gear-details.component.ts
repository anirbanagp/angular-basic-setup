import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { BaseComponent } from "../base.componant";
import { BaseService } from "./../services/base.service";

import { getPublicGearDetails, getPrivateGearDetails, RESULT_ERROR } from "./../shared/constant";
import { GearDetails } from "./../shared/models/gear-details.model";

@Component({
  selector: 'app-public-gear-details',
  templateUrl: './public-gear-details.component.html',
  styleUrls: ['./public-gear-details.component.css']
})
export class PublicGearDetailsComponent extends BaseComponent implements OnInit {

  protected gearId: any;
  public gearDetailsAvgRating: Array<number> = [];

  public gearDetails: GearDetails = new GearDetails();

  constructor(public baseService: BaseService, private route: ActivatedRoute) {
    super(baseService);
    this.baseService.global.showLoader();
    this.route.params.subscribe(params => {
      this.gearId = params.id ? params.id : 0;
    });
  }

  ngOnInit() {
    this.baseService.baseApi.getPublicGearDetails(this.gearId);
  }

  handleApiResponse(data: any) {
    if (data.resulttype === getPublicGearDetails) {
      this.gearDetails = data.result.result;
      this.gearDetailsAvgRating = Array.from(Array(Math.round(this.gearDetails.avg_rating)).keys());
      this.baseService.global.hideLoader();
    }
    if (data.resulttype === RESULT_ERROR) {
      this.baseService.global.hideLoader();
      this.baseService.global.loadNoDataFound('No Gear Found!');
    }
  }

}
