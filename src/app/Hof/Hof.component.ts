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
}
