import { Component, OnInit, OnDestroy } from "@angular/core"
import { SettingsService } from "../services/settings.service"
import { Subscription } from "rxjs"

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'fr'
  translations: any = {}
  private languageSubscription!: Subscription

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.languageSubscription = this.settingsService.language$.subscribe(lang => {
      this.currentLanguage = lang
      this.translations = this.settingsService.getTranslation(lang)
    })
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe()
    }
  }
}
