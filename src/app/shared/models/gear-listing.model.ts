import { ContactInfoData } from "./contact-info";

export class GearList {
  public gearName = "";
  public gear_category_name = "";
  public gear_sub_category_name = "";
  public gear_brand_name = "";
  public gear_model_name = "";
  public gearAdditionalNotes = "";
  public model_description = "";
  public additional_description = "";
  public per_day_cost_aud_ex_gst = "";
  public replacement_value_aud_inc_gst = "";
  public gearCondition = "Old";
  public extraItems = [new ExtraItems()];
  public is_kit = false;
  public address = [];
  public listing_option = "listed";
  public serialNumber = "";
  public gearTypeId = "";
  public image360Link = "";
  public unAvailableDates = [];
}
export class Address {
  public street_address_line1 = "";
  public street_address_line2 = "";
  public ks_state_id = "";
  public ks_suburb_id = "";
  public postcode = "";
  public is_default = false;
}
export class ExtraItems {
  item: "";
  serial: "";
}
