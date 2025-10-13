import { Injectable } from '@angular/core';
import { HallOfFameService } from './hall-of-fame.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreManagerService {
  
  constructor(private hallOfFameService: HallOfFameService) {}

  /**
   * Ajoute un nouveau score au Hall of Fame
   * @param playerName Nom du joueur
   * @param score Score obtenu
   * @param totalQuestions Nombre total de questions
   * @param quizType Type de quiz ('world', 'europe', 'africa', etc.)
   * @param timeTaken Temps pris en secondes
   */
  recordScore(
    playerName: string, 
    score: number, 
    totalQuestions: number, 
    quizType: string, 
    timeTaken: number
  ): void {
    const newScore = {
      id: Date.now(), // Simple ID basé sur timestamp
      playerName: playerName || 'Joueur Anonyme',
      score,
      totalQuestions,
      quizType,
      date: new Date(),
      timeTaken
    };

    this.hallOfFameService.addScore(newScore);
  }

  /**
   * Calcule le pourcentage de réussite
   */
  calculatePercentage(score: number, totalQuestions: number): number {
    return Math.round((score / totalQuestions) * 100);
  }

  /**
   * Détermine le niveau de performance
   */
  getPerformanceLevel(percentage: number): 'excellent' | 'good' | 'average' | 'poor' {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 50) return 'average';
    return 'poor';
  }

  /**
   * Formate le temps en minutes:secondes
   */
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}