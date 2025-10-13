import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

interface ContinentOption {
  id: string;
  name: string;
  nameEn: string;
  nameEs: string;
  icon: string;
  color: string;
  countries: number;
}

@Component({
  selector: 'app-continent-selection',
  templateUrl: './continent-selection.component.html',
  styleUrls: ['./continent-selection.component.scss']
})
export class ContinentSelectionComponent implements OnInit {
  currentLanguage: string = 'fr';
  translations: any = {};
  selectedContinents: string[] = [];

  continents: ContinentOption[] = [
    {
      id: 'europe',
      name: 'Europe',
      nameEn: 'Europe', 
      nameEs: 'Europa',
      icon: '🇪🇺',
      color: '#2563eb',
      countries: 44
    },
    {
      id: 'asia',
      name: 'Asie',
      nameEn: 'Asia',
      nameEs: 'Asia',
      icon: '🌏',
      color: '#f59e0b',
      countries: 48
    },
    {
      id: 'africa',
      name: 'Afrique',
      nameEn: 'Africa',
      nameEs: 'África',
      icon: '🌍',
      color: '#16a34a',
      countries: 54
    },
    {
      id: 'north_america',
      name: 'Amérique du Nord',
      nameEn: 'North America',
      nameEs: 'América del Norte',
      icon: '🌎',
      color: '#dc2626',
      countries: 23
    },
    {
      id: 'south_america',
      name: 'Amérique du Sud',
      nameEn: 'South America',
      nameEs: 'América del Sur',
      icon: '🌎',
      color: '#9333ea',
      countries: 12
    },
    {
      id: 'oceania',
      name: 'Océanie',
      nameEn: 'Oceania',
      nameEs: 'Oceanía',
      icon: '🏝️',
      color: '#06b6d4',
      countries: 14
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

  getContinentName(continent: ContinentOption): string {
    switch (this.currentLanguage) {
      case 'en': return continent.nameEn;
      case 'es': return continent.nameEs;
      default: return continent.name;
    }
  }

  toggleContinent(continentId: string): void {
    const index = this.selectedContinents.indexOf(continentId);
    if (index > -1) {
      this.selectedContinents.splice(index, 1);
    } else {
      this.selectedContinents.push(continentId);
    }
  }

  isContinentSelected(continentId: string): boolean {
    return this.selectedContinents.includes(continentId);
  }

  startQuiz(): void {
    if (this.selectedContinents.length === 0) {
      alert(this.translations?.continent_selection?.selectAtLeastOne || 'Veuillez sélectionner au moins un continent');
      return;
    }

    // Stocker la sélection et rediriger vers le quiz
    localStorage.setItem('selected-continents', JSON.stringify(this.selectedContinents));
    this.router.navigate(['/quiz/continent']);
  }

  selectAll(): void {
    this.selectedContinents = this.continents.map(c => c.id);
  }

  clearAll(): void {
    this.selectedContinents = [];
  }

  goBack(): void {
    this.router.navigate(['/quiz_choice']);
  }
}