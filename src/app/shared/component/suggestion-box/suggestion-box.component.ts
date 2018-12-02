import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from "@angular/core";

@Component({
  selector: "app-suggestion-box",
  templateUrl: "./suggestion-box.component.html",
  styleUrls: ["./suggestion-box.component.css"]
})
export class SuggestionBoxComponent implements OnInit, OnChanges {
  @Input()
  name: string;
  @Input()
  placeHolder: string;
  @Input()
  optionLabelField: string;
  @Input()
  optionValueField: string;
  @Input()
  suggestions: Array<any> = [];
  @Input()
  selectedValue: string;
  @Input()
  isDisabled: boolean = false;

  @Output()
  updatedSuggestionValue = new EventEmitter<any>();

  public showSuggestionList: boolean = false;
  public suggestionListOptions: Array<any> = [];
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.suggestions && this.suggestions.length) {
      this.suggestions = this.suggestions.map(option => {
        return { value: option[this.optionValueField], label: option[this.optionLabelField] };
      });
    }
  }

  newValueSelected() {
    let value = this.selectedValue;
    if (value && value.length) {
      this.updatedSuggestionValue.emit(value);
    }
    // this.showSuggestionList = false;
  }
  updateTextFieldValue(selectedValue: any) {
    this.selectedValue = selectedValue;
    this.showSuggestionList = false;
    this.newValueSelected();
  }

  filterSuggestionList(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.selectedValue && this.selectedValue.length > 1) {
      this.suggestionListOptions = this.suggestions.filter(option => {
        return option.label.toLowerCase().indexOf(this.selectedValue.toLowerCase()) > -1;
      });
      this.showSuggestionList = true;
    } else {
      this.showSuggestionList = false;
    }
  }
}
