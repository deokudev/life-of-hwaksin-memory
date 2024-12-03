import { Injectable } from "@angular/core";
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: "root",
})
export class DarkModeService {
  private prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  private darkModeKey = "dark-mode"; // Local storage key for dark mode

  constructor() {
    // Listen for changes to the prefers-color-scheme media query
    this.prefersDark.addEventListener("change", (mediaQuery) => this.toggleDarkPalette(mediaQuery.matches));
  }

  // Initialize dark mode based on user preference or saved setting
  async initializeDarkPalette() {
    const savedDarkMode = await this.getDarkModePreference();

    // If no saved setting, use the prefers-color-scheme media query
    const isDark = savedDarkMode !== null ? savedDarkMode : this.prefersDark.matches;
    this.toggleDarkPalette(isDark);

    return isDark;
  }

  // Toggle the dark mode
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
    this.saveDarkModePreference(shouldAdd); // Save the new preference
  }

  // Save the dark mode preference to local storage
  private async saveDarkModePreference(isDark: boolean) {
    await Preferences.set({
      key: this.darkModeKey,
      value: JSON.stringify(isDark),
    });
  }

  // Get the saved dark mode preference from local storage
  private async getDarkModePreference(): Promise<boolean | null> {
    const { value } = await Preferences.get({ key: this.darkModeKey });
    return value ? JSON.parse(value) : null;
  }
}
