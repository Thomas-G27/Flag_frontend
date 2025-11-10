import { Component, OnInit, OnDestroy } from "@angular/core"
import { Link } from "models/links.model"
import { SettingsService } from "../services/settings.service"
import { Subscription } from "rxjs"

@Component({
  selector: "navbar", 
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  links: Link[] = []
  currentLanguage: string = 'fr'
  private languageSubscription!: Subscription
  private translations: any = {}

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.translations = this.settingsService.getTranslation(this.settingsService.getCurrentLanguage())
    this.languageSubscription = this.settingsService.language$.subscribe(lang => {
      this.currentLanguage = lang
      this.translations = this.settingsService.getTranslation(lang)
      this.updateLinks()
    })
    this.updateLinks()
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe()
    }
  }

  private updateLinks(): void {
    const translations = this.translations || this.settingsService.getTranslation(this.currentLanguage)
    this.links = [
      { name: ` ${translations.nav.home}`, href: "home" },
      { name: ` ${translations.nav.rules}`, href: "rules" },
      { name: ` ${translations.nav.quiz}`, href: "quiz_choice" },
      { name: ` ${translations.nav.hof}`, href: "hall_of_fame" }
    ]
  }

  // simple helper used by the template: tr('nav.home','Accueil')
  tr(path: string, fallback = ''): string {
    if (!this.translations) return fallback
    const parts = path.split('.')
    let cur: any = this.translations
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
      else return fallback
    }
    return typeof cur === 'string' ? cur : fallback
  }
}
