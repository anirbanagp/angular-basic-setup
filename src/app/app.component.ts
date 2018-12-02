import { Component } from "@angular/core";
import { GlobalService } from "./services/global.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

/**
 * main component functionality
 */
export class AppComponent {

	public loaderState : boolean = false;
	
	constructor(public global : GlobalService) {
		this.global.loaderState.subscribe((state) => {

			this.loaderState = state;
		})
	}

}
