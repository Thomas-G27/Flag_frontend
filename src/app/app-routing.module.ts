import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { QuizComponent } from "quiz/quiz.component"
import { QuizChoiceComponent } from "quiz_choice/quiz_choice.component"
import { RulesComponent } from "rules/rules.component"
import { CountriesComponent } from "countries/countries.component"
import { InscriptionComponent } from "inscription/inscription.component"
import { HofComponent } from "hof/hof.component"

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "quiz", component: QuizComponent },
  { path: "quiz/world", component: QuizComponent },
  { path: "quiz/continent", component: QuizComponent },
  { path: "quiz/language", component: QuizComponent },
  { path: "quiz_choice", component: QuizChoiceComponent },
  { path: "rules", component: RulesComponent },
  { path: "countries", component: CountriesComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "hall_of_fame", component: HofComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
