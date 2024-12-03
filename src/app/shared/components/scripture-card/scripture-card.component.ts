import { Component, Input } from "@angular/core";

@Component({
  selector: "app-scripture-card",
  templateUrl: "./scripture-card.component.html",
})
export class ScriptureCardComponent {
  @Input() scripture: any;
  isMemorized = false;

  toggleMemorize() {
    this.isMemorized = !this.isMemorized;
  }
}
