import { GlobalService } from "../../services/global.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})

/**
 * contain footer component functionality
 */
export class FooterComponent {
  /**
   * manage dependency injcection of services
   * @param global GlobalService
   */
  constructor(public global: GlobalService) {}
}
