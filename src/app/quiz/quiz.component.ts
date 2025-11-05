import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Subscription } from "rxjs"
import { Pays, PaysService } from '../services/pays.service';

interface Question {
  flagUrl: string;
  answers: string[];
}

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  @ViewChild('countryInput') countryInput!: ElementRef;

  paysList: Pays[] = [];
  selectedPays?: Pays;

  constructor(
    private paysService: PaysService,
    private settingsService: SettingsService
  ) {}

  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  userAnswer: string = '';
  feedback: string = '';
  score: number = 0;
  quizFinished: boolean = false;

  // pour les traductions
  currentLanguage: string = 'fr'
  translations: any = {}
  private languageSubscription!: Subscription

  ngOnInit(): void { 
    // On récupère les pays depuis le backend
    this.paysService.getAllPays().subscribe({
      next: (data) => {
        this.paysList = data;

        if (this.paysList.length > 0) {
          const premierPays = this.paysList[0];

          // On remplit la première question avec son drapeau
          const countryCode = this.emojiToCountryCode(premierPays.drapeau);
            // log pour vérifier le code pays
            console.log('Code pays pour le drapeau', premierPays.drapeau, '=>', countryCode);
            
          this.questions = [
            {
                flagUrl: `https://flagcdn.com/w320/${countryCode}.png`,
                answers: [premierPays.name.toLowerCase()]
            }
          ];
          this.shuffleQuestions();
        }
      },
      error: (err) => console.error('Erreur de chargement des pays', err)
    });

    // Gestion de la langue
    this.languageSubscription = this.settingsService.language$.subscribe(lang => {
      this.currentLanguage = lang
      this.translations = this.settingsService.getTranslation(lang)
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  shuffleQuestions(): void {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  submitAnswer(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const answer = this.userAnswer.trim().toLowerCase();

    if (currentQuestion.answers.includes(answer)) {
      this.feedback = 'Bonne réponse !';
      this.score++;
    } else {
      this.feedback = 'Mauvaise réponse, dommage...';
    }

    setTimeout(() => {
      this.feedback = '';
      this.userAnswer = '';
      this.nextQuestion();
    }, 1200);
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.quizFinished = true;
    } else {
      setTimeout(() => {
        this.countryInput.nativeElement.focus();
      });
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizFinished = false;
    this.userAnswer = '';
    this.feedback = '';
  }
  // Convertit un emoji drapeau (🇦🇷) en code ISO ("ar")
  emojiToCountryCode(emoji: string): string {
    if (!emoji) return '';
    const codePoints = Array.from(emoji, (char) => char.codePointAt(0)! - 127397);
    return codePoints.map(cp => String.fromCharCode(cp)).join('').toLowerCase();
    }

}
