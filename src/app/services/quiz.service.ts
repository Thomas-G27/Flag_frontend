import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { Country, QuizQuestion } from "models/quiz.model"

@Injectable({
  providedIn: "root",
})
export class QuizService {
  private countries: Country[] = [
    {
      name: "France",
      code: "FR",
      continent: "Europe",
      languages: ["French"],
      flagUrl: "https://flagcdn.com/w320/fr.png"
    },
    {
      name: "Germany",
      code: "DE", 
      continent: "Europe",
      languages: ["German"],
      flagUrl: "https://flagcdn.com/w320/de.png"
    },
    {
      name: "Spain",
      code: "ES",
      continent: "Europe", 
      languages: ["Spanish"],
      flagUrl: "https://flagcdn.com/w320/es.png"
    },
    // Vous pouvez ajouter plus de pays ici
  ]

  constructor() {}

  getCountriesByContinent(continent: string): Observable<Country[]> {
    const filtered = this.countries.filter(country => 
      continent === 'all' || country.continent.toLowerCase() === continent.toLowerCase()
    )
    return of(filtered)
  }

  getCountriesByLanguage(language: string): Observable<Country[]> {
    const filtered = this.countries.filter(country =>
      country.languages.some(lang => 
        lang.toLowerCase().includes(language.toLowerCase())
      )
    )
    return of(filtered)
  }

  getAllCountries(): Observable<Country[]> {
    return of(this.countries)
  }

  checkAnswer(countryName: string, userAnswer: string): boolean {
    return countryName.toLowerCase().trim() === userAnswer.toLowerCase().trim()
  }
}