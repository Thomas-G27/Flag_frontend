import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SettingsService } from '../services/settings.service';
import { Pays, PaysService } from '../services/pays.service';
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';

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
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  userAnswer: string = '';
  feedback: string = '';
  score: number = 0;
  quizFinished: boolean = false;

  // paramètres du quiz
  quizType: string = 'world';
  selectedContinent?: string;
  selectedLanguage?: string;
  questionCount: number = 10;

  // langue / traductions
  currentLanguage: string = 'fr';
  translations: any = {};
  private languageSubscription!: Subscription;

  constructor(
    private paysService: PaysService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // récupère les paramètres du quiz depuis l’URL
    this.route.queryParams.subscribe(params => {
      this.quizType = params['type'] || 'world';
      this.selectedContinent = params['continent'];
      this.selectedLanguage = params['language'];
      this.questionCount = +params['count'] || 10;

      // charge les pays selon le type de quiz
      this.loadCountries();
    });

    // gestion de la langue
    this.languageSubscription = this.settingsService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.translations = this.settingsService.getTranslation(lang);
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  // Charge les pays selon le type de quiz
  loadCountries(): void {
    let fetch$;

    if (this.quizType === 'continent' && this.selectedContinent) {
      fetch$ = this.paysService.getPaysByContinent(this.selectedContinent);
    } else if (this.quizType === 'language' && this.selectedLanguage) {
      fetch$ = this.paysService.getPaysByLanguage(this.selectedLanguage);
    } else {
      fetch$ = this.paysService.getAllPays();
    }

    fetch$.subscribe({
      next: (data: Pays[]) => {
        this.paysList = this.shuffleArray(data).slice(0, this.questionCount);
        this.buildQuestions();
      },
      error: (err) => console.error('Erreur de chargement des pays', err)
    });
  }

  // Crée les questions à partir de la liste des pays
  buildQuestions(): void {
    this.questions = this.paysList.map(pays => ({
      flagUrl: `https://flagcdn.com/w320/${pays.flag.toLowerCase()}.png`,
      answers: [pays.name.toLowerCase()]
    }));

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizFinished = false;
    this.feedback = '';
    this.userAnswer = '';
  }

  // Mélange un tableau
  shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  // Vérifie la réponse
  submitAnswer(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const answer = this.userAnswer.trim().toLowerCase();

    if (currentQuestion.answers.includes(answer)) {
      this.feedback = this.translations.quiz?.good || 'Bonne réponse !';
      this.score++;
    } else {
      this.feedback = this.translations.quiz?.bad || 'Mauvaise réponse...';
    }

    setTimeout(() => {
      this.feedback = '';
      this.userAnswer = '';
      this.nextQuestion();
    }, 1200);
  }

  // Passe à la question suivante
  nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.quizFinished = true;
      this.saveResult();
    } else {
      setTimeout(() => this.countryInput.nativeElement.focus());
    }
  }

  // Redémarre le quiz
  restartQuiz(): void {
    this.loadCountries();
    this.shuffleArray(this.paysList);
    this.buildQuestions();
  }

  private saveResult(): void {
    const user = this.userService.getCurrentUser();
    const username = user?.name || 'Guest';
    this.gameService.addGame({
      username,
      score: this.score,
      total: this.questions.length,
      mode: this.quizType,
      dateISO: new Date().toISOString()
    });
  }

  // convertit un emoji drapeau en code ISO (utile si backend renvoie emoji)
  emojiToCountryCode(emoji: string): string {
    if (!emoji) return '';
    const codePoints = Array.from(emoji, (char) => char.codePointAt(0)! - 127397);
    return codePoints.map(cp => String.fromCharCode(cp)).join('').toLowerCase();
  }
}
