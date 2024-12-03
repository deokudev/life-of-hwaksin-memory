import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ScriptureCardComponent } from "./components/scripture-card/scripture-card.component";

const commonModules = [CommonModule, FormsModule, ReactiveFormsModule, IonicModule];
const components = [ScriptureCardComponent];

@NgModule({
  imports: [...commonModules],
  declarations: [...components],
  exports: [...components],
})
export class SharedModule {}
