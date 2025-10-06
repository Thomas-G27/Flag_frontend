import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private currentLanguage = new BehaviorSubject<string>('fr')
  private currentTheme = new BehaviorSubject<string>('light')

  public language$ = this.currentLanguage.asObservable()
  public theme$ = this.currentTheme.asObservable()

  constructor() {
    // Charger les préférences sauvegardées
    const savedLanguage = localStorage.getItem('quiz-language') || 'fr'
    const savedTheme = localStorage.getItem('quiz-theme') || 'light'
    
    this.setLanguage(savedLanguage)
    this.setTheme(savedTheme)
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value
  }

  getCurrentTheme(): string {
    return this.currentTheme.value
  }

  setLanguage(language: string): void {
    this.currentLanguage.next(language)
    localStorage.setItem('quiz-language', language)
    this.updateDocumentLanguage(language)
  }

  setTheme(theme: string): void {
    this.currentTheme.next(theme)
    localStorage.setItem('quiz-theme', theme)
    this.updateDocumentTheme(theme)
  }

  private updateDocumentLanguage(language: string): void {
    document.documentElement.lang = language
  }

  private updateDocumentTheme(theme: string): void {
    document.body.classList.remove('light-theme', 'dark-theme')
    document.body.classList.add(`${theme}-theme`)
  }

  getTranslation(language: string): any {
    const translations: { [lang: string]: any } = {
      'fr': {
        nav: {
          home: 'Accueil',
          quiz: 'Quiz Drapeaux',
          rules: 'Règles'
        },
        home: {
          title: 'Quiz des Drapeaux',
          welcome: 'Testez vos connaissances des drapeaux du monde entier !',
          description1: 'Découvrez les drapeaux de différents pays et apprenez en vous amusant.',
          description2: 'Êtes-vous prêt à relever le défi ?',
          playButton: 'JOUER',
          rulesButton: 'RÈGLES'
        },
        rules: {
          title: 'Règles du Quiz',
          objective: 'Objectif',
          gameplay: 'Comment jouer',
          scoring: 'Système de points'
        },
        settings: {
          title: 'Paramètres',
          language: 'Langue',
          theme: 'Thème',
          light: 'Clair',
          dark: 'Sombre'
        }
      },
      'en': {
        nav: {
          home: 'Home',
          quiz: 'Flag Quiz',
          rules: 'Rules'
        },
        home: {
          title: 'Flag Quiz',
          welcome: 'Test your knowledge of flags from around the world!',
          description1: 'Discover flags from different countries and learn while having fun.',
          description2: 'Are you ready to take on the challenge?',
          playButton: 'PLAY',
          rulesButton: 'RULES'
        },
        rules: {
          title: 'Quiz Rules',
          objective: 'Objective',
          gameplay: 'How to play',
          scoring: 'Scoring system'
        },
        settings: {
          title: 'Settings',
          language: 'Language',
          theme: 'Theme',
          light: 'Light',
          dark: 'Dark'
        }
      },
      'es': {
        nav: {
          home: 'Inicio',
          quiz: 'Quiz Banderas',
          rules: 'Reglas'
        },
        home: {
          title: 'Quiz de Banderas',
          welcome: '¡Pon a prueba tu conocimiento de las banderas del mundo!',
          description1: 'Descubre las banderas de diferentes países y aprende divirtiéndote.',
          description2: '¿Estás listo para aceptar el desafío?',
          playButton: 'JUGAR',
          rulesButton: 'REGLAS'
        },
        rules: {
          title: 'Reglas del Quiz',
          objective: 'Objetivo',
          gameplay: 'Cómo jugar',
          scoring: 'Sistema de puntuación'
        },
        settings: {
          title: 'Configuración',
          language: 'Idioma',
          theme: 'Tema',
          light: 'Claro',
          dark: 'Oscuro'
        }
      }
    }

    return translations[language] || translations['fr']
  }
}