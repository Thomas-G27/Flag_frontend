import { Component, OnInit } from '@angular/core';
import { PaysService, Pays } from '../services/pays.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  paysList: Pays[] = [];
  selectedPays?: Pays;

  constructor(private paysService: PaysService) {}

  ngOnInit(): void {
    this.paysService.getAllPays().subscribe({
      next: (data) => this.paysList = data,
      error: (err) => console.error('Erreur de chargement des pays', err)
    });
  }

  onSelectPays(code: String): void {
    this.paysService.getPaysByCode(code).subscribe({
      next: (data) => this.selectedPays = data,
      error: (err) => console.error('Erreur de chargement du pays', err)
    });
    console.log('Pays sélectionné:', this.selectedPays);
  }
}
