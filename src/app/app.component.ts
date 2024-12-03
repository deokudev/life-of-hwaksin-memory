import { Component, OnInit } from "@angular/core";
import { DarkModeService } from "./shared/services/dark-mode.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private darkModeService: DarkModeService) {}

  async ngOnInit() {
    // 앱 초기화 시 다크 모드 초기화
    await this.darkModeService.initializeDarkPalette();
  }
}
