import { Component, OnInit } from '@angular/core';
import { GameService, Game } from '../services/game.service';

@Component({
  selector: 'app-hof',
  templateUrl: './hof_admin.component.html',
  styleUrls: ['./hof_admin.component.scss']
})
export class Hof_adminComponent implements OnInit {

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
      next: (data) => this.games = data.sort((a, b) => b.score - a.score),
      error: (err) => this.errorMessage = 'Erreur lors du chargement des parties'
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
  
  deleteGame(game: Game): void {
    if (confirm(`Supprimer la partie de ${game.utilisateur_name} ?`)) {
      this.gameService.deleteGame((game as any).id).subscribe({
        next: () => {
          this.games = this.games.filter(g => (g as any).id !== (game as any).id);
          alert('Partie supprimée avec succès.');
        },
        error: (err) => {
          console.error('Erreur de suppression', err);
          alert('Erreur lors de la suppression.');
        }
      });
    }
  }
}
