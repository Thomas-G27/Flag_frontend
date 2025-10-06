import { Component } from "@angular/core"
import { Link } from "models/links.model"

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  links: Link[] = []

  constructor() {
    this.links.push({ name: "🏠 Accueil", href: "" })
    this.links.push({ name: "🎮 Quiz Drapeaux", href: "quiz" })
    this.links.push({ name: "📋 Règles", href: "rules" })
  }
}
