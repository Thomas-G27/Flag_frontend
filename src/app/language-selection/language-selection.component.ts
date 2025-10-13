import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

interface LanguageOption {
  id: string;
  name: string;
  nameEn: string;
  nameEs: string;
  nativeName: string;
  icon: string;
  color: string;
  countries: number;
  regions: string[];
}

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {
  currentLanguage: string = 'fr';
  translations: any = {};
  selectedLanguages: string[] = [];

  languages: LanguageOption[] = [
    {
      id: 'french',
      name: 'Français',
      nameEn: 'French',
      nameEs: 'Francés',
      nativeName: 'Français',
      icon: '🇫🇷',
      color: '#0055a4',
      countries: 29,
      regions: ['Europe', 'Afrique', 'Amérique']
    },
    {
      id: 'english',
      name: 'Anglais',
      nameEn: 'English',
      nameEs: 'Inglés',
      nativeName: 'English',
      icon: '🇬🇧',
      color: '#c8102e',
      countries: 67,
      regions: ['Europe', 'Amérique', 'Afrique', 'Asie', 'Océanie']
    },
    {
      id: 'spanish',
      name: 'Espagnol',
      nameEn: 'Spanish',
      nameEs: 'Español',
      nativeName: 'Español',
      icon: '🇪🇸',
      color: '#c60b1e',
      countries: 21,
      regions: ['Europe', 'Amérique', 'Afrique']
    },
    {
      id: 'portuguese',
      name: 'Portugais',
      nameEn: 'Portuguese',
      nameEs: 'Portugués',
      nativeName: 'Português',
      icon: '🇵🇹',
      color: '#ff0000',
      countries: 9,
      regions: ['Europe', 'Amérique', 'Afrique', 'Asie']
    },
    {
      id: 'arabic',
      name: 'Arabe',
      nameEn: 'Arabic',
      nameEs: 'Árabe',
      nativeName: 'العربية',
      icon: '🇸🇦',
      color: '#006c35',
      countries: 22,
      regions: ['Afrique', 'Asie']
    },
    {
      id: 'german',
      name: 'Allemand',
      nameEn: 'German',
      nameEs: 'Alemán',
      nativeName: 'Deutsch',
      icon: '🇩🇪',
      color: '#ffce00',
      countries: 6,
      regions: ['Europe']
    },
    {
      id: 'chinese',
      name: 'Chinois',
      nameEn: 'Chinese',
      nameEs: 'Chino',
      nativeName: '中文',
      icon: '🇨🇳',
      color: '#de2910',
      countries: 3,
      regions: ['Asie']
    },
    {
      id: 'russian',
      name: 'Russe',
      nameEn: 'Russian',
      nameEs: 'Ruso',
      nativeName: 'Русский',
      icon: '🇷🇺',
      color: '#0039a6',
      countries: 4,
      regions: ['Europe', 'Asie']
    },
    {
      id: 'italian',
      name: 'Italien',
      nameEn: 'Italian',
      nameEs: 'Italiano',
      nativeName: 'Italiano',
      icon: '🇮🇹',
      color: '#009246',
      countries: 4,
      regions: ['Europe']
    },
    {
      id: 'dutch',
      name: 'Néerlandais',
      nameEn: 'Dutch',
      nameEs: 'Neerlandés',
      nativeName: 'Nederlands',
      icon: '🇳🇱',
      color: '#ff9b00',
      countries: 3,
      regions: ['Europe', 'Amérique']
    }
  ];

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.settingsService.getCurrentLanguage();
    this.translations = this.settingsService.getTranslation(this.currentLanguage);
  }

  getLanguageName(language: LanguageOption): string {
    switch (this.currentLanguage) {
      case 'en': return language.nameEn;
      case 'es': return language.nameEs;
      default: return language.name;
    }
  }

  toggleLanguage(languageId: string): void {
    const index = this.selectedLanguages.indexOf(languageId);
    if (index > -1) {
      this.selectedLanguages.splice(index, 1);
    } else {
      this.selectedLanguages.push(languageId);
    }
  }

  isLanguageSelected(languageId: string): boolean {
    return this.selectedLanguages.includes(languageId);
  }

  startQuiz(): void {
    if (this.selectedLanguages.length === 0) {
      alert(this.translations?.language_selection?.selectAtLeastOne || 'Veuillez sélectionner au moins une langue');
      return;
    }

    // Stocker la sélection et rediriger vers le quiz
    localStorage.setItem('selected-languages', JSON.stringify(this.selectedLanguages));
    this.router.navigate(['/quiz/language']);
  }

  selectAll(): void {
    this.selectedLanguages = this.languages.map(l => l.id);
  }

  clearAll(): void {
    this.selectedLanguages = [];
  }

  goBack(): void {
    this.router.navigate(['/quiz_choice']);
  }
}