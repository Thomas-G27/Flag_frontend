import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Subscription } from "rxjs"

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

    questions: Question[] = [
        {
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg',
            answers: ['nepal', 'népal']
        },
        {
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Flag_of_East_Timor.svg',
            answers: ['timor oriental', 'timor-oriental', 'timor', 'timor leste', 'timor-leste', 'east timor']
        },
        {
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg',
            answers: ['inde', 'india']
        },
        {
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',
            answers: ['brésil', 'bresil', 'brazil']
        },
        {
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg',
            answers: ['russie', 'russia']
        }
    ];

    currentQuestionIndex: number = 0;
    userAnswer: string = '';
    feedback: string = '';
    score: number = 0;
    quizFinished: boolean = false;

    // pour les traductions
    currentLanguage: string = 'fr'
    translations: any = {}
    private languageSubscription!: Subscription

    constructor(private settingsService: SettingsService) { }

    ngOnInit(): void { 
        this.languageSubscription = this.settingsService.language$.subscribe(lang => {
            this.currentLanguage = lang
            this.translations = this.settingsService.getTranslation(lang)
        })
        this.shuffleQuestions();
    }

    ngOnDestroy(): void {
        if (this.languageSubscription) {
            this.languageSubscription.unsubscribe()
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
}