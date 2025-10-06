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

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.languageSubscription = this.settingsService.language$.subscribe(lang => {
      this.currentLanguage = lang
      this.updateLinks()
    })
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe()
    }
  }

  private updateLinks(): void {
    const translations = this.settingsService.getTranslation(this.currentLanguage)
    this.links = [
      { name: ` ${translations.nav.home}`, href: "" },
      { name: ` ${translations.nav.quiz}`, href: "quiz" },
      { name: ` ${translations.nav.rules}`, href: "rules" }
    ]
  }
}
