import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Subscription } from 'rxjs';
import { Continent, ContinentsService } from 'services/continents.service';
import { LanguagesService } from 'services/languages.service';

@Component({
  selector: 'quiz-choice',
  templateUrl: './quiz_choice.component.html',
  styleUrls: ['./quiz_choice.component.scss']
})
export class QuizChoiceComponent implements OnInit {
  translations: any = {};
  currentLanguage: string = 'fr';
  private languageSubscription!: Subscription;
  private continentSubscription!: Subscription;
  private languesSubscription!: Subscription;

  continents: string[] = [];
  langues: string[] = [];

  quizzes = [
    {
      id: 'world',
      name: 'Drapeaux du Monde',
      description: 'Tous les drapeaux des pays du monde',
      icon: '🌍',
      color: '#dc2626',
      selectedFlagsCount: 10
    },
    {
      id: 'continent',
      name: 'Continent',
      description: 'Devine le pays selon son continent',
      icon: '🗺️',
      color: '#2563eb',
      selectedFlagsCount: 10,
      selectedContinent: 'Europe'
    },
    {
      id: 'language',
      name: 'Langue',
      description: 'Devine le pays selon la langue parlée',
      icon: '📖',
      color: '#16a34a',
      selectedFlagsCount: 10,
      selectedLanguage: 'French'
    },
    {
      id: 'capital',
      name: 'Capitale',
      description: 'Devine la capitale liée au drapeau',
      icon: '🏙️',
      color: '#d97706',
      selectedFlagsCount: 10
    }
  ];

  constructor(private settingsService: SettingsService, private continentsService: ContinentsService, private languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.languageSubscription = this.settingsService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.translations = this.settingsService.getTranslation(lang);
    });
    this.loadContinents();
    this.loadLangues();
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  loadContinents() {
    this.continentSubscription = this.continentsService.getAllContinents().subscribe({
      next: (data) => {
        // recupere le name (ex : [{name: "Europe"}, {name: "Asie"}])
        this.continents = data.map(c => c.name);

        // Valeur par défaut du quiz "continent"
        const continentQuiz = this.quizzes.find(q => q.id === 'continent');
        if (continentQuiz && this.continents.length > 0) {
          continentQuiz.selectedContinent = this.continents[0];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des continents :', err);
      }
    });
  }

  loadLangues() {
    this.languesSubscription = this.languagesService.getAllLanguages().subscribe({
      next: (data) => {
        this.langues = data.map(l => l.name);

        const languageQuiz = this.quizzes.find(q => q.id === 'language');
        if (languageQuiz && this.langues.length > 0) {
          languageQuiz.selectedLanguage = this.langues[0];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des langues :', err);
      }
    });
  }
}
