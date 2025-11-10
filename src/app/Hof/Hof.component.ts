import { Component, OnInit } from '@angular/core';
import { GameService, Game } from '../services/game.service';

@Component({
  selector: 'app-hof',
  templateUrl: './hof.component.html',
  styleUrls: ['./hof.component.scss']
})
export class HofComponent implements OnInit {
  games: Game[] = [];
  errorMessage = '';
  usernameFilter = '';
  categoryFilter = '';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe({
      next: (data) => this.games = data.sort((a,b)=> b.score - a.score),
      error: () => this.errorMessage = 'Erreur lors du chargement des parties'
    });
  }

  onUsernameInput(): void {
    this.categoryFilter = ''; // efface catégorie si on commence à taper un username
    if (!this.usernameFilter.trim()) { this.loadGames(); return; }
    this.gameService.getGamesByUser(this.usernameFilter).subscribe({
      next: (data) => this.games = data.sort((a,b)=> b.score - a.score),
      error: () => this.errorMessage = 'Aucune partie trouvée pour cet utilisateur.'
    });
  }

  onCategoryInput(): void {
    this.usernameFilter = ''; // efface username si on commence à taper une catégorie
    if (!this.categoryFilter.trim()) { this.loadGames(); return; }
    this.gameService.getGamesByCategory(this.categoryFilter).subscribe({
      next: (data) => this.games = data.sort((a,b)=> b.score - a.score),
      error: () => this.errorMessage = 'Aucune partie trouvée pour cette catégorie.'
    });
  }

}
