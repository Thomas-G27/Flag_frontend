import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GameScore {
  id: number;
  playerName: string;
  score: number;
  totalQuestions: number;
  quizType: string;
  date: Date;
  timeTaken: number; // en secondes
}

@Injectable({
  providedIn: 'root'
})
export class HallOfFameService {
  private scoresSubject = new BehaviorSubject<GameScore[]>([]);
  public scores$ = this.scoresSubject.asObservable();

  constructor() {
    this.loadScores();
  }

  private loadScores(): void {
    const savedScores = localStorage.getItem('quiz-hall-of-fame');
    
    if (savedScores) {
      const scores = JSON.parse(savedScores).map((score: any) => ({
        ...score,
        date: new Date(score.date)
      }));
      this.scoresSubject.next(this.sortScores(scores));
    } else {
      // Données de démonstration
      const demoScores: GameScore[] = [
        {
          id: 1,
          playerName: 'Alice',
          score: 18,
          totalQuestions: 20,
          quizType: 'world',
          date: new Date('2024-12-10'),
          timeTaken: 95
        },
        {
          id: 2,
          playerName: 'Bob',
          score: 17,
          totalQuestions: 20,
          quizType: 'europe',
          date: new Date('2024-12-09'),
          timeTaken: 120
        },
        {
          id: 3,
          playerName: 'Charlie',
          score: 16,
          totalQuestions: 20,
          quizType: 'africa',
          date: new Date('2024-12-08'),
          timeTaken: 110
        },
        {
          id: 4,
          playerName: 'Diana',
          score: 19,
          totalQuestions: 20,
          quizType: 'world',
          date: new Date('2024-12-07'),
          timeTaken: 85
        },
        {
          id: 5,
          playerName: 'Eve',
          score: 15,
          totalQuestions: 20,
          quizType: 'europe',
          date: new Date('2024-12-06'),
          timeTaken: 140
        }
      ];
      
      this.scoresSubject.next(this.sortScores(demoScores));
      this.saveScores(demoScores);
    }
  }

  private sortScores(scores: GameScore[]): GameScore[] {
    return scores.sort((a, b) => {
      // Trier par score décroissant, puis par temps croissant
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timeTaken - b.timeTaken;
    });
  }

  private saveScores(scores: GameScore[]): void {
    localStorage.setItem('quiz-hall-of-fame', JSON.stringify(scores));
  }

  addScore(score: GameScore): void {
    const currentScores = this.scoresSubject.value;
    const newScores = [...currentScores, score];
    const sortedScores = this.sortScores(newScores);
    
    this.scoresSubject.next(sortedScores);
    this.saveScores(sortedScores);
  }

  clearScores(): void {
    this.scoresSubject.next([]);
    localStorage.removeItem('quiz-hall-of-fame');
  }

  getFilteredScores(quizType?: string): GameScore[] {
    const scores = this.scoresSubject.value;
    if (!quizType || quizType === 'all') {
      return scores;
    }
    return scores.filter(score => score.quizType === quizType);
  }

  getTopScores(limit: number = 10): GameScore[] {
    return this.scoresSubject.value.slice(0, limit);
  }

  getPlayerBestScore(playerName: string): GameScore | null {
    const scores = this.scoresSubject.value.filter(s => s.playerName === playerName);
    return scores.length > 0 ? scores[0] : null;
  }

  getScoreById(id: number): GameScore | null {
    return this.scoresSubject.value.find(score => score.id === id) || null;
  }

  removeScore(scoreId: number): void {
    const currentScores = this.scoresSubject.value;
    const filteredScores = currentScores.filter(score => score.id !== scoreId);
    
    if (filteredScores.length !== currentScores.length) {
      this.scoresSubject.next(filteredScores);
      this.saveScores(filteredScores);
    }
  }
}