import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { QuizComponent } from "quiz/quiz.component"
import { QuizChoiceComponent } from "quiz_choice/quiz_choice.component"
import { RulesComponent } from "rules/rules.component"
import { CountriesComponent } from "countries/countries.component"
import { InscriptionComponent } from "./inscription/inscription.component" 
import { HofComponent } from "Hof/Hof.component"
import { LoginComponent } from "./login/login.component"
import { Hof_adminComponent } from "Hof_admin/Hof_admin.component"
import { AuthGuard } from "./auth/auth.guard";
import { ConnexionComponent } from "connexion/connexion.component"

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "quiz", component: QuizComponent, canActivate: [AuthGuard] },
  { path: "quiz/world", component: QuizComponent, canActivate: [AuthGuard] },
  { path: "quiz/continent", component: QuizComponent, canActivate: [AuthGuard] },
  { path: "quiz/language", component: QuizComponent, canActivate: [AuthGuard] },
  { path: "quiz_choice", component: QuizChoiceComponent, canActivate: [AuthGuard] },
  { path: "rules", component: RulesComponent },
  { path: "countries", component: CountriesComponent, canActivate: [AuthGuard] },
  { path: "inscription", component: InscriptionComponent },
  { path: "connexion", component: ConnexionComponent},
  { path: "hall_of_fame", component: HofComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "admin/hall_of_fame", component: Hof_adminComponent, canActivate: [AuthGuard] }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
