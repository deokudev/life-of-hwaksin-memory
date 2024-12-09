import { Component, Input, OnInit } from "@angular/core";
import { AnimationController } from "@ionic/angular";
import { TtsService } from "../../services/tts.service";

@Component({
  selector: "app-scripture-card",
  templateUrl: "./scripture-card.component.html",
  styleUrls: ["./scripture-card.component.scss"],
})
export class ScriptureCardComponent implements OnInit {
  @Input() scripture: any;
  isMemorized = false;
  hideWords = false;
  currentFocus: string = "all";
  memorizationProgress: number = 0;
  timeSpentMemorizing: number = 0;
  startTime!: number;

  constructor(private animationCtrl: AnimationController, private ttsService: TtsService) {}

  ngOnInit() {}

  toggleMemorize() {
    this.isMemorized = !this.isMemorized;
    if (this.isMemorized) {
      this.hideWords = true;
      this.startTime = Date.now();
    } else {
      this.hideWords = false;
      this.timeSpentMemorizing += (Date.now() - this.startTime) / 1000;
    }
    this.updateProgress();
  }

  toggleHideWords() {
    this.hideWords = !this.hideWords;
  }

  focusOn(event: any) {
    const part = event.detail.value;
    this.currentFocus = part;
  }

  async playAudio() {
    await this.ttsService.speak({
      text: this.scripture.content,
      lang: "ko-KR", // 한국어로 설정. 필요에 따라 변경 가능
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
    });
  }

  async stopAudio() {
    await this.ttsService.stop();
  }

  animateText() {
    const textElement = document.querySelector(".scripture-text") as Element;
    const animation = this.animationCtrl
      .create()
      .addElement(textElement)
      .duration(1000)
      .iterations(1)
      .fromTo("transform", "scale(1)", "scale(1.1)")
      .fromTo("opacity", "0.2", "1");

    animation.play();
  }

  updateProgress() {
    // 이 부분은 실제 암송 진행 상황을 추적하는 로직으로 대체해야 합니다.
    // 여기서는 간단한 예시로 랜덤 값을 사용합니다.
    this.memorizationProgress = Math.min(100, this.memorizationProgress + Math.random() * 20);
  }
}
