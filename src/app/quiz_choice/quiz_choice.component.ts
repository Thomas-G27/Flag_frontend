import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'quiz-choice',
  templateUrl: './quiz_choice.component.html',
  styleUrls: ['./quiz_choice.component.scss']
})
export class QuizChoiceComponent implements OnInit {
  translations: any = {};
  currentLanguage: string = 'fr';
  private languageSubscription!: Subscription;

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

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.languageSubscription = this.settingsService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.translations = this.settingsService.getTranslation(lang);
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
