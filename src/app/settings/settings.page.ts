import { Component, OnInit } from "@angular/core";
import { DarkModeService } from "../shared/services/dark-mode.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  paletteToggle = false;

  constructor(private darkModeService: DarkModeService) {}

  async ngOnInit() {
    // Initialize the dark mode based on user preference
    this.paletteToggle = await this.darkModeService.initializeDarkPalette();
  }

  // Listen for the toggle change event
  toggleChange(ev: any) {
    this.darkModeService.toggleDarkPalette(ev.detail.checked);
  }
}
