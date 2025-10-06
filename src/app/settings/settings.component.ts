import { Component, OnInit } from "@angular/core"
import { SettingsService } from "../services/settings.service"

@Component({
  selector: "settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  isOpen = false
  currentLanguage: string = 'fr'
  currentTheme: string = 'light'

  languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.currentLanguage = this.settingsService.getCurrentLanguage()
    this.currentTheme = this.settingsService.getCurrentTheme()
  }

  toggleSettings(): void {
    this.isOpen = !this.isOpen
  }

  closeSettings(): void {
    this.isOpen = false
  }

  changeLanguage(languageCode: string): void {
    this.currentLanguage = languageCode
    this.settingsService.setLanguage(languageCode)
    this.closeSettings()
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
    this.settingsService.setTheme(this.currentTheme)
  }
}