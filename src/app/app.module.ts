import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "app-routing.module"
import { AppComponent } from "app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NavbarComponent } from "navbar/navbar.component"
import { MatListModule } from "@angular/material/list"
import { HomeComponent } from "home/home.component"
import { FormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { QuizComponent } from "quiz/quiz.component"
import { RulesComponent } from "rules/rules.component"
import { SettingsComponent } from "./settings/settings.component"
import { QuizChoiceComponent } from "./quiz_choice/quiz_choice.component"
import { HofComponent } from "./hof/hof.component"
import { ContinentSelectionComponent } from "./continent-selection/continent-selection.component"
import { LanguageSelectionComponent } from "./language-selection/language-selection.component"
import { HttpClientModule } from "@angular/common/http"

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    QuizComponent,
    RulesComponent,
    SettingsComponent,
    QuizChoiceComponent,
    HofComponent,
    ContinentSelectionComponent,
    LanguageSelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
