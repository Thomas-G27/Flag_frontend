import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "app-routing.module"
import { AppComponent } from "app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NavbarComponent } from "navbar/navbar.component"
import { MatListModule } from "@angular/material/list"
import { HomeComponent } from "home/home.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { QuizComponent } from "quiz/quiz.component"
import { RulesComponent } from "rules/rules.component"
import { SettingsComponent } from "./settings/settings.component"
import { QuizChoiceComponent } from "./quiz_choice/quiz_choice.component"
import { HttpClientModule } from "@angular/common/http"
import { CountriesComponent } from "countries/countries.component"
import { InscriptionComponent } from "./inscription/inscription.component"
import { ConnexionComponent } from "connexion/connexion.component"
import { HofComponent } from "Hof/Hof.component"
import { Hof_adminComponent } from "Hof_admin/Hof_admin.component"
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    QuizComponent,
    RulesComponent,
    SettingsComponent,
    QuizChoiceComponent,
    CountriesComponent,
    InscriptionComponent,
    ConnexionComponent,
    HofComponent,
    Hof_adminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
