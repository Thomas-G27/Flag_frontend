import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {
    userAnswer: string = '';
    feedback: string = '';

    constructor() { }

    ngOnInit(): void { }

    submitAnswer(): void {
        // Ici tu pourras appeler ton backend plus tard
        // Exemple de vérification locale temporaire :
        if (this.userAnswer.trim().toLowerCase() === 'états-unis' || this.userAnswer.trim().toLowerCase() === 'etats-unis' || this.userAnswer.trim().toLowerCase() === 'usa') {
            this.feedback = 'Bonne réponse !';
        } else {
            this.feedback = 'Mauvaise réponse, essaye encore.';
        }
    }
}