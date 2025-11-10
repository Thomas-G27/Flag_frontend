import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaysService, Pays } from '../services/pays.service';
import { ContinentsService } from 'services/continents.service';
import { LanguagesService } from 'services/languages.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {
  paysList: Pays[] = [];
  selectedPays?: Pays;
  continents: string[] = [];
  langues: string[] = [];

  continentFilter: string = '';
  languageFilter: string = '';

  private languesSubscription!: Subscription;
  private continentSubscription!: Subscription;

  constructor(
    private paysService: PaysService,
    private continentsService: ContinentsService,
    private languagesService: LanguagesService
  ) {}

  ngOnInit(): void {
    this.loadAllPays();
    this.loadContinents();
    this.loadLangues();
  }

  ngOnDestroy(): void {
    this.languesSubscription?.unsubscribe();
    this.continentSubscription?.unsubscribe();
  }

  loadAllPays(): void {
    this.paysService.getAllPays().subscribe({
      next: (data) => (this.paysList = data),
      error: (err) => console.error('Erreur de chargement des pays', err)
    });
  }

  onContinentInput(): void {
    this.languageFilter = '';
    if (!this.continentFilter.trim()) {
      this.loadAllPays();
      return;
    }
    this.paysService.getPaysByContinent(this.continentFilter).subscribe({
      next: (data) => (this.paysList = data),
      error: (err) => console.error('Erreur de chargement des pays par continent', err)
    });
  }

  onLanguageInput(): void {
    this.continentFilter = '';
    if (!this.languageFilter.trim()) {
      this.loadAllPays();
      return;
    }
    this.paysService.getPaysByLanguage(this.languageFilter).subscribe({
      next: (data) => (this.paysList = data),
      error: (err) => console.error('Erreur de chargement des pays par langue', err)
    });
  }

  resetFilters(): void {
    this.languageFilter = '';
    this.continentFilter = '';
    this.loadAllPays();
  }

  onSelectPays(code: string): void {
    this.paysService.getPaysByCode(code).subscribe({
      next: (data) => (this.selectedPays = data),
      error: (err) => console.error('Erreur de chargement du pays', err)
    });
  }

  loadContinents() {
    this.continentSubscription = this.continentsService.getAllContinents().subscribe({
      next: (data) => (this.continents = data.map((c) => c.name)),
      error: (err) => console.error('Erreur lors du chargement des continents', err)
    });
  }

  loadLangues() {
    this.languesSubscription = this.languagesService.getAllLanguages().subscribe({
      next: (data) => (this.langues = data.map((l) => l.name)),
      error: (err) => console.error('Erreur lors du chargement des langues', err)
    });
  }
}
