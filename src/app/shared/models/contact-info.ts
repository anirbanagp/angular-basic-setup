export class StateListOption {
  state_id: string;
  ks_state_code: string;
  ks_state_name: string;
}

export class SuburbListOption {
  ks_suburb_id: string;
  ks_state_id: string;
  suburb_name: string;
  suburb_postcode: string;
}

export class ContactInfoData {
  street_address_line1: string = "";
  street_address_line2: string = "";
  ks_country_id: string = "1";
  ks_state_id: string = "";
  ks_suburb_id: string = "";
  postcode: string = "";
  is_default: boolean = false;
  user_address_id: string = "";
}
