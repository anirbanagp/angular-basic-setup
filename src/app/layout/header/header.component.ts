import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy, Inject, HostListener } from "@angular/core";
import { GlobalService } from "../../services/global.service";
import { AuthService } from "../../services/auth.service";

import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})

/**
 * contain header component functionality
 */
export class HeaderComponent implements OnInit, OnDestroy {
  navIsFixed: boolean;
  private routeSubscriber: any;

  public navMenuClass: any = [];
  /**
   * manage dependency injcection of services
   * @param global GlobalService
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public global: GlobalService,
    public auth: AuthService,
    public router: Router
  ) {
    this.auth.checkLoggedIn();
    this.routeSubscriber  =  this.router.events.subscribe(() => {
       this.navMenuClass[0] = false;
      this.navMenuClass[1] = false;
    });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { this.navIsFixed = false; }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  ngOnInit() {}

  toggleNavMenu(index: number) {
    this.navMenuClass[index] = !this.navMenuClass[index];
  }
  logout() {
    this.auth.logout();
  }
  ngOnDestroy() {
    this.routeSubscriber.unsubscribe();
  }
}
