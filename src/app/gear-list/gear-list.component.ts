import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base.componant";
import { BaseService } from "../services/base.service";
import { getAllGearSubCategory, getAllGearBrand, getAllGearCategory, getAllModelsOfBrand, getModelDetails, usersContactInfo, addGearList, getGearListItems } from "../shared/constant";
import { GearList, ExtraItems } from "../shared/models/gear-listing.model";
import { ContactInfoData } from "../shared/models/contact-info";

@Component({
  selector: "app-gear-list",
  templateUrl: "./gear-list.component.html",
  styleUrls: ["./gear-list.component.css"]
})
export class GearListComponent extends BaseComponent implements OnInit {
  public gearCategoryList: Array<any> = [];
  public gearSubCategoryList: Array<any> = [];
  public gearBrandList: Array<any> = [];
  public gearModelList: Array<any> = [];
  public gearConditionlList: Array<any> = ["New", "Like New", "Slightly Worn", "Worn"];
  public gearTypeList: Array<any> = [{ id: 1, label: "Studio" }, { id: 2, label: "Kit" }, { id: 4, label: "Item" }]; // { id: 3, label: "Accessory" },
  public gearListData: GearList = new GearList();
  public gearImageList = [];
  public extraItems: Array<ExtraItems> = [new ExtraItems()];
  public disabled = { category: false, subCategory: false };
  public allAddress: Array<any> = [new ContactInfoData()];
  public sliderDetails = { minValue: "30", maxValue: "100", minRange: "15", maxRange: "120" };
  public uploadedFiles: Array<File> = [];
  public unAvailableCount: Array<any> = ["dt0"];
  public minDate = new Date();
  public unAvailableDates: Date[] = [];
  public gearItemsList = [];

  constructor(public baseService: BaseService) {
    super(baseService);
    this.baseService.global.showLoader();
  }

  ngOnInit() {
    this.baseService.baseApi.getAllGearBrand();
    this.baseService.baseApi.getAllGearCategory();
    this.baseService.baseApi.getUsersContactInfo();
    this.baseService.baseApi.getGearListItems();
  }
  handleApiResponse(data: any) {
    if (data.resulttype === getAllGearBrand) {
      this.gearBrandList = data.result.result;
      this.baseService.global.hideLoader();
    }
    if (data.resulttype === getAllGearCategory) {
      this.gearCategoryList = data.result.result;
    }
    if (data.resulttype === getAllGearSubCategory) {
      this.gearSubCategoryList = data.result.result;
    }
    if (data.resulttype === getAllModelsOfBrand) {
      this.gearModelList = data.result.result;
    }
    if (data.resulttype === getGearListItems) {
      this.gearItemsList = data.result.result;
    }

    if (data.resulttype === getModelDetails) {
      if (data.result.match_found === 1) {
        this.gearCategoryList = data.result.category;
        this.setSelectedModelDetails(data.result.result);
      }
    }
    if (data.resulttype === usersContactInfo) {
      this.allAddress = this.baseService.global.getContactInfoData(data.result.result);
      // this.gearListData.address = this.allAddress.map((item, index) => {
      //   return index;
      // });
    }
    if (data.resulttype === addGearList) {
      this.baseService.showMessage("successfully added!");
      this.uploadAllImages(data.result.result.user_gear_desc_id, data.result.result.model_id);
    }
  }
  gearCategorySelected(categoryName: string) {
    this.gearListData.gear_category_name = categoryName;
    this.baseService.baseApi.getAllGearSubCategory(categoryName);
  }
  gearSubCategorySelected(subCategoryName: string) {
    this.gearListData.gear_sub_category_name = subCategoryName;
  }
  gearBrandSelected(brandName: string) {
    this.gearListData.gear_brand_name = brandName;
    this.baseService.baseApi.getAllModelsOfBrand(brandName);
  }
  gearModelSelected(modelName: string) {
    let modelDetails = { model_name: modelName, manufacturer_name: this.gearListData.gear_brand_name, gear_category_name: "" };
    this.gearListData.gear_model_name = modelName;
    this.baseService.baseApi.getModelDetails(modelDetails);
  }
  calculteReplacementValue(perDayCost) {
    this.gearListData.replacement_value_aud_inc_gst = (parseFloat(perDayCost) * 1.1).toFixed(2);
  }
  setSelectedModelDetails(modelDetails) {
    if (modelDetails) {
      this.setCategoryDetails(modelDetails);
      this.gearListData.model_description = modelDetails.model_description;
      this.gearListData.per_day_cost_aud_ex_gst = modelDetails.per_day_cost_aud_ex_gst;
      this.gearListData.replacement_value_aud_inc_gst = modelDetails.replacement_value_aud_inc_gst;
      this.gearImageList = [];
      this.gearImageList.push(modelDetails.model_image);
      this.sliderDetails.minValue = (parseFloat(this.gearListData.per_day_cost_aud_ex_gst) * 0.5).toFixed(2);
      this.sliderDetails.maxValue = (parseFloat(this.gearListData.per_day_cost_aud_ex_gst) * 1.5).toFixed(2);
      this.sliderDetails.minRange = Math.ceil(parseFloat(this.sliderDetails.minValue) * 0.5).toString();
      this.sliderDetails.maxRange = Math.ceil(parseFloat(this.sliderDetails.maxValue) * 1.4).toString();
    }
  }
  setCategoryDetails(modelDetails) {
    let selectedCategory = this.gearCategoryList.filter(category => {
      return category.gear_category_id === modelDetails.gear_category_id;
    })[0];
    this.gearListData.gear_category_name = selectedCategory.gear_category_name;
    this.disabled.category = true;
    if (selectedCategory.gear_sub_category_id !== "0") {
      let subCategory = this.gearCategoryList.filter(category => {
        return category.gear_category_id === selectedCategory.gear_sub_category_id;
      })[0];
      this.gearListData.gear_sub_category_name = subCategory.gear_category_name;
      this.disabled.subCategory = true;
    }
  }
  removeImage(index: number) {
    this.gearImageList.splice(index, 1);
  }
  updateExtraItemValueHandler(newValueDetails) {
    this.gearListData.extraItems[newValueDetails.index] = newValueDetails.updatedValue;
  }
  ExtraItemActionValueHandler(actionDetails) {
    if (actionDetails.action === "add") {
      this.gearListData.extraItems.push(new ExtraItems());
      this.extraItems.push(new ExtraItems());
    } else {
      this.gearListData.extraItems.splice(actionDetails.index, 1);
      this.extraItems.splice(actionDetails.index, 1);
    }
  }
  addressActionHandeler(index, action) {
    if (action === "add") {
      this.gearListData.address.push(new ContactInfoData());
    } else {
      this.gearListData.address.splice(index, 1);
      this.allAddress.splice(index, 1);
    }
    // this.allAddress = this.gearListData.address;
  }
  addressUpdateHandler(updatedAddress) {
    updatedAddress.updatedValue.is_default = this.gearListData.address[updatedAddress.index].is_default;
    this.gearListData.address[updatedAddress.index] = updatedAddress.updatedValue;
  }
  addressSelectHandler(id: string, isChecked: boolean) {
    if (isChecked) {
      this.gearListData.address.push(id);
    } else {
      let index = this.gearListData.address.findIndex(x => x.value === id);
      this.gearListData.address.splice(index, 1);
    }
  }
  setVariousBrans() {
    this.gearListData.gear_brand_name = "various";
  }
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let eachImage = event.target.files[0];
      this.uploadedFiles.push(<File>eachImage);
      console.log(this.uploadedFiles);
      reader.readAsDataURL(eachImage);
      reader.onload = () => {
        this.gearImageList.push(reader.result);
      };
    }
  }
  addNewUnavailableDate() {
    let lastIndex = this.unAvailableCount.length;
    this.unAvailableCount.push("dt" + lastIndex);
    this.unAvailableDates.push(new Date());
  }
  saveGearData() {
    let unavailableFormattedDates = this.unAvailableDates.map(e => {
      return [e[0].format("YYYY-MM-DD"), e[1].format("YYYY-MM-DD")];
    });
    this.gearListData.unAvailableDates = unavailableFormattedDates;
    console.log(JSON.stringify(this.gearListData));

    this.baseService.baseApi.addGearList(this.gearListData);
  }
  uploadAllImages(user_gear_desc_id, model_id) {
    if (this.uploadedFiles.length > 0) {
      let uploadData = new FormData();
      for (const eachFile of this.uploadedFiles) {
        if (eachFile) {
          uploadData.append("image[]", eachFile, eachFile.name);
        }
      }
      uploadData.append("model_id", model_id);
      uploadData.append("user_gear_desc_id", user_gear_desc_id);

      this.baseService.baseApi.addGearImage(uploadData);
    }
  }
}
