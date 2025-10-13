import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { QuizComponent } from "quiz/quiz.component"
import { QuizChoiceComponent } from "quiz_choice/quiz_choice.component"
import { ContinentSelectionComponent } from "continent-selection/continent-selection.component"
import { LanguageSelectionComponent } from "language-selection/language-selection.component"
import { RulesComponent } from "rules/rules.component"
import { HofComponent } from "hof/hof.component"

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "quiz/world", component: QuizComponent },
  { path: "quiz/europe", component: QuizComponent },
  { path: "quiz/francophone", component: QuizComponent },
  { path: "quiz/continent", component: QuizComponent },
  { path: "quiz/language", component: QuizComponent },
  { path: "quiz/:type", component: QuizComponent },
  { path: "quiz_choice", component: QuizChoiceComponent },
  { path: "continent-selection", component: ContinentSelectionComponent },
  { path: "language-selection", component: LanguageSelectionComponent },
  { path: "rules", component: RulesComponent },
  { path: "hof", component: HofComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
