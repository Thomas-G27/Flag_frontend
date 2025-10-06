import { Component, OnInit } from "@angular/core"
import { SettingsService } from "./services/settings.service"

@Component({
  selector: "root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "front-skeleton"
  currentTheme: string = 'light'

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.theme$.subscribe(theme => {
      this.currentTheme = theme
      document.body.className = `theme-${theme}`
    })
  }
}
