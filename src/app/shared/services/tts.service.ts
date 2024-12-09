import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { TextToSpeech } from "@capacitor-community/text-to-speech";

@Injectable({
  providedIn: "root",
})
export class TtsService {
  private speechSynthesis: SpeechSynthesis | undefined;
  private speechUtterance: SpeechSynthesisUtterance | undefined;

  constructor(private platform: Platform) {
    if (this.platform.is("mobileweb") || this.platform.is("desktop")) {
      if ("speechSynthesis" in window) {
        this.speechUtterance = new SpeechSynthesisUtterance();
        this.speechSynthesis = window.speechSynthesis;
        window.addEventListener("beforeunload", () => {
          this.stop();
        });
      }
    }
  }

  async speak(options: { text: string; lang: string; rate?: number; pitch?: number; volume?: number }) {
    await this.stop();
    if (this.platform.is("ios") || this.platform.is("android")) {
      await TextToSpeech.speak({
        text: options.text,
        lang: options.lang,
        rate: options.rate || 1.0,
        pitch: options.pitch || 1.0,
        volume: options.volume || 1.0,
        category: "ambient",
      });
    } else if (this.speechSynthesis && this.speechUtterance) {
      this.speechUtterance.text = options.text;
      this.speechUtterance.lang = options.lang;
      this.speechUtterance.rate = options.rate || 1.0;
      this.speechUtterance.pitch = options.pitch || 2.0;
      this.speechUtterance.volume = options.volume || 1.0;
      this.speechSynthesis.speak(this.speechUtterance);
    }
  }

  async stop() {
    if (this.platform.is("ios") || this.platform.is("android")) {
      await TextToSpeech.stop();
    } else if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  async getSupportedLanguages() {
    if (this.platform.is("ios") || this.platform.is("android")) {
      return (await TextToSpeech.getSupportedLanguages()).languages;
    } else if (this.speechSynthesis) {
      const voices = this.speechSynthesis.getVoices();
      const languages = voices.map((voice) => voice.lang);
      const filteredLanguages = languages.filter((v, i, a) => a.indexOf(v) == i);
      return filteredLanguages;
    }
    return [];
  }

  async getSupportedVoices() {
    if (this.platform.is("ios") || this.platform.is("android")) {
      return (await TextToSpeech.getSupportedVoices()).voices;
    } else if (this.speechSynthesis) {
      return this.speechSynthesis.getVoices();
    }
    return [];
  }

  async isLanguageSupported(lang: string) {
    if (this.platform.is("ios") || this.platform.is("android")) {
      return (await TextToSpeech.isLanguageSupported({ lang })).supported;
    } else if (this.speechSynthesis) {
      const languages = await this.getSupportedLanguages();
      return languages.includes(lang);
    }
    return false;
  }
}
