import { Component, OnDestroy, OnInit } from "@angular/core";
import { SCRIPTURES } from "../shared/constants/scriptures";
import { AdService } from "../shared/services/ad.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  scriptures = SCRIPTURES;
  constructor(private adService: AdService) {}

  async ngOnInit() {
    await this.adService.initializeAd();
    await this.adService.showBanner();
  }

  ngOnDestroy() {
    this.adService.removeBanner();
  }
}
