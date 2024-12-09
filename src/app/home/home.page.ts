import { Component, OnDestroy, OnInit } from "@angular/core";
import { SCRIPTURES_OF_HWAKSIN } from "../shared/constants/SCRIPTURES_OF_HWAKSIN";
import { AdService } from "../shared/services/ad.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  SCRIPTURES_OF_HWAKSIN = SCRIPTURES_OF_HWAKSIN;
  constructor(private adService: AdService) {}

  async ngOnInit() {
    await this.adService.initializeAd();
    await this.adService.showBanner();
  }

  ngOnDestroy() {
    this.adService.removeBanner();
  }
}
