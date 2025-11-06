import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Subscription } from 'rxjs';
import { Continent, ContinentsService } from 'services/continents.service';

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

  continents: string[] = [];
  languages: string[] = ['French', 'English', 'Spanish', 'Arabic', 'Chinese'];

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
    }
  ];

  constructor(private settingsService: SettingsService, private continentsService: ContinentsService) {}

  ngOnInit(): void {
    this.languageSubscription = this.settingsService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.translations = this.settingsService.getTranslation(lang);
    });
    this.loadContinents();
    
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  loadContinents() {
    this.continentSubscription = this.continentsService.getAllContinents().subscribe({
      next: (data) => {
        // Si ton API renvoie par exemple [{name: "Europe"}, {name: "Asie"}]
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
}
