import { Component } from "@angular/core";
import { SCRIPTURES } from "../shared/constants/scriptures";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  scriptures = SCRIPTURES;
  constructor() {}
}
