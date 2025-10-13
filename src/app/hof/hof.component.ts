import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SettingsService } from '../services/settings.service';
import { HallOfFameService, GameScore } from '../services/hall-of-fame.service';

@Component({
  selector: 'app-hof',
  templateUrl: './hof.component.html',
  styleUrls: ['./hof.component.scss']
})
export class HofComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'fr';
  currentTheme: string = 'light';
  isAdministrator: boolean = false;
  translations: any = {};
  scores: GameScore[] = [];
  filteredScores: GameScore[] = [];
  selectedQuizType: string = 'all';
  
  private languageSubscription!: Subscription;
  private themeSubscription!: Subscription;
  private scoresSubscription!: Subscription;
  private adminSubscription!: Subscription;

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private hallOfFameService: HallOfFameService
  ) {}

  ngOnInit(): void {
    // S'abonner aux changements de langue
    this.languageSubscription = this.settingsService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.translations = this.settingsService.getTranslation(lang);
    });

    // S'abonner aux changements de thème
    this.themeSubscription = this.settingsService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    // S'abonner aux scores du Hall of Fame
    this.scoresSubscription = this.hallOfFameService.scores$.subscribe(scores => {
      this.scores = scores;
      this.filterScores();
    });

    // S'abonner au mode administrateur
    this.adminSubscription = this.settingsService.isAdministrator$.subscribe(isAdmin => {
      this.isAdministrator = isAdmin;
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.scoresSubscription) {
      this.scoresSubscription.unsubscribe();
    }
    if (this.adminSubscription) {
      this.adminSubscription.unsubscribe();
    }
  }



  filterScores(): void {
    if (this.selectedQuizType === 'all') {
      this.filteredScores = this.scores;
    } else {
      this.filteredScores = this.scores.filter(score => score.quizType === this.selectedQuizType);
    }
  }

  handleSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.onQuizTypeChange(target.value);
    }
  }

  onQuizTypeChange(quizType: string): void {
    this.selectedQuizType = quizType;
    this.filterScores();
  }

  getScorePercentage(score: GameScore): number {
    return Math.round((score.score / score.totalQuestions) * 100);
  }

  getQuizTypeLabel(quizType: string): string {
    const labels: { [key: string]: any } = {
      'world': this.translations?.hof?.quizTypes?.world || 'Monde',
      'europe': this.translations?.hof?.quizTypes?.europe || 'Europe',
      'africa': this.translations?.hof?.quizTypes?.africa || 'Afrique'
    };
    return labels[quizType] || quizType;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getRankIcon(index: number): string {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}`;
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR');
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goToQuizChoice(): void {
    this.router.navigate(['/quiz_choice']);
  }

  clearScores(): void {
    if (confirm(this.translations?.hof?.confirmClear || 'Êtes-vous sûr de vouloir effacer tous les scores ?')) {
      this.hallOfFameService.clearScores();
    }
  }

  removeScore(scoreId: number): void {
    if (confirm(this.translations?.admin?.confirmRemoveScore || 'Êtes-vous sûr de vouloir supprimer ce score ?')) {
      this.hallOfFameService.removeScore(scoreId);
    }
  }
}
