import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service';
// import { TranslateService } from '@ngx-translate/core';

interface QuizQuestion {
    flagUrl: string;
    answers: string[];
    continent?: string;
    language?: string;
}

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
    questions: QuizQuestion[] = [];
    currentQuestionIndex = 0;
    score = 0;
    userAnswer = '';
    isAnswered = false;
    isCorrect = false;
    showFeedback = false;
    gameFinished = false;
    maxQuestions = 10;
    timeLeft = 30;
    timerInterval: any;
    quizType = '';
    quizTitle = '';
    selectedContinent = '';
    selectedLanguage = '';
    translations: any = {};
    feedback = '';
    quizFinished = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private adminService: AdminService
    ) {}

    ngOnInit(): void {
        this.loadTranslations();
        this.detectQuizType();
        this.loadQuizData();
        this.startTimer();
    }

    loadTranslations(): void {
        // Temporary - will be replaced with actual translations later
        this.translations = {
            'quiz.restart': 'Recommencer',
            'quiz.home': 'Accueil',
            'quiz.score': 'Score',
            'quiz.timeLeft': 'Temps restant',
            'quiz.question': 'Question',
            'quiz.enterFlag': 'Entrez le nom du pays',
            'quiz.submit': 'Valider',
            'quiz.correct': 'Correct',
            'quiz.incorrect': 'Incorrect',
            'quiz.finished': 'Quiz terminé'
        };
    }

    detectQuizType(): void {
        // Récupérer le type de quiz depuis l'URL ou les paramètres de route
        const urlSegments = this.router.url.split('/');
        const typeFromUrl = urlSegments[urlSegments.length - 1];

        // Vérifier si c'est un quiz créé par l'utilisateur
        if (typeFromUrl.startsWith('custom-')) {
            this.quizType = typeFromUrl;
            console.log('Quiz créé détecté:', typeFromUrl);
            return;
        }

        // Vérifier si c'est un type de quiz valide prédéfini
        const validTypes = ['world', 'europe', 'francophone', 'continent-custom', 'language-custom'];
        
        if (validTypes.includes(typeFromUrl)) {
            this.quizType = typeFromUrl;
        } else {
            // Fallback vers les paramètres de route
            this.route.params.subscribe(params => {
                const paramType = params['type'] || 'world';
                if (paramType.startsWith('custom-')) {
                    this.quizType = paramType;
                } else {
                    this.quizType = paramType;
                }
            });
        }

        // Récupérer les sélections depuis localStorage si nécessaire
        if (this.quizType === 'continent-custom') {
            this.selectedContinent = localStorage.getItem('selectedContinent') || '';
        } else if (this.quizType === 'language-custom') {
            this.selectedLanguage = localStorage.getItem('selectedLanguage') || '';
        }
    }

    loadQuizData(): void {
        // Vérifier si c'est un quiz créé par l'utilisateur
        if (this.quizType.startsWith('custom-')) {
            this.loadUserCreatedQuiz();
            return;
        }

        const quizConfig = this.adminService.getQuizByType(this.quizType);
        
        if (quizConfig) {
            this.quizTitle = quizConfig.title || quizConfig.name;
            this.maxQuestions = quizConfig.maxQuestions || quizConfig.questions;
        }

        switch (this.quizType) {
            case 'world':
                this.loadWorldQuestions();
                break;
            case 'europe':
                this.loadEuropeQuestions();
                break;
            case 'francophone':
                this.loadFrancophoneQuestions();
                break;
            case 'continent-custom':
                this.loadContinentQuestions();
                break;
            case 'language-custom':
                this.loadLanguageQuestions();
                break;
            default:
                this.loadWorldQuestions();
        }
        
        // Limiter le nombre de questions et mélanger
        this.questions = this.questions.slice(0, this.maxQuestions);
        this.shuffleQuestions();
    }

    loadWorldQuestions(): void {
        this.questions = [
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg',
                answers: ['nepal', 'népal']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Flag_of_East_Timor.svg',
                answers: ['timor oriental', 'timor-oriental', 'timor', 'timor leste', 'timor-leste', 'east timor']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg',
                answers: ['égypte', 'egypte', 'egypt']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg',
                answers: ['iran']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg',
                answers: ['russie', 'russia']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',
                answers: ['brésil', 'bresil', 'brazil']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
                answers: ['mexique', 'mexico']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
                answers: ['espagne', 'spain']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
                answers: ['france']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',
                answers: ['allemagne', 'germany']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom.svg',
                answers: ['royaume-uni', 'royaume uni', 'united kingdom', 'uk', 'angleterre', 'england']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
                answers: ['italie', 'italy']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
                answers: ['états-unis', 'etats-unis', 'usa', 'united states']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada.svg',
                answers: ['canada']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg',
                answers: ['australie', 'australia']
            }
        ];
    }

    loadEuropeQuestions(): void {
        this.questions = [
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
                answers: ['france']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',
                answers: ['allemagne', 'germany']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
                answers: ['italie', 'italy']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
                answers: ['espagne', 'spain']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom.svg',
                answers: ['royaume-uni', 'royaume uni', 'united kingdom', 'uk']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg',
                answers: ['pays-bas', 'pays bas', 'netherlands', 'hollande']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg',
                answers: ['belgique', 'belgium']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg',
                answers: ['suisse', 'switzerland']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg',
                answers: ['autriche', 'austria']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg',
                answers: ['pologne', 'poland']
            }
        ];
    }

    loadFrancophoneQuestions(): void {
        this.questions = [
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
                answers: ['france']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg',
                answers: ['belgique', 'belgium']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg',
                answers: ['suisse', 'switzerland']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada.svg',
                answers: ['canada']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg',
                answers: ['sénégal', 'senegal']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg',
                answers: ['mali']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Guinea.svg',
                answers: ['guinée', 'guinee', 'guinea']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Ivory_Coast.svg',
                answers: ['côte d\'ivoire', 'cote d\'ivoire', 'ivory coast']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg',
                answers: ['algérie', 'algerie', 'algeria']
            },
            {
                flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg',
                answers: ['tunisie', 'tunisia']
            }
        ];
    }

    loadContinentQuestions(): void {
        // Charger les questions basées sur le continent sélectionné
        if (!this.selectedContinent) {
            this.loadWorldQuestions();
            return;
        }

        // Ici, vous pourriez filtrer les questions par continent
        // Pour l'instant, on charge les questions du monde
        this.loadWorldQuestions();
        
        // Filtrer par continent si implémenté
        if (this.selectedContinent !== 'all') {
            this.questions = this.questions.filter(q => q.continent === this.selectedContinent);
        }
    }

    loadLanguageQuestions(): void {
        // Charger les questions basées sur la langue sélectionnée
        if (!this.selectedLanguage) {
            this.loadWorldQuestions();
            return;
        }

        // Ici, vous pourriez filtrer les questions par langue
        // Pour l'instant, on charge les questions du monde
        this.loadWorldQuestions();
        
        // Filtrer par langue si implémenté
        if (this.selectedLanguage !== 'all') {
            this.questions = this.questions.filter(q => q.language === this.selectedLanguage);
        }
    }

    shuffleQuestions(): void {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    startTimer(): void {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    timeUp(): void {
        this.isAnswered = true;
        this.isCorrect = false;
        this.showFeedback = true;
        clearInterval(this.timerInterval);
        
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    submitAnswer(): void {
        if (this.isAnswered) return;

        this.isAnswered = true;
        clearInterval(this.timerInterval);
        
        const normalizedAnswer = this.userAnswer.toLowerCase().trim();
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        this.isCorrect = currentQuestion.answers.some(answer => 
            answer.toLowerCase() === normalizedAnswer
        );
        
        if (this.isCorrect) {
            this.score++;
        }
        
        this.showFeedback = true;
        
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    nextQuestion(): void {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.gameFinished = true;
        } else {
            this.resetQuestionState();
            this.startTimer();
        }
    }

    resetQuestionState(): void {
        this.userAnswer = '';
        this.isAnswered = false;
        this.isCorrect = false;
        this.showFeedback = false;
        this.timeLeft = 30;
    }

    restartQuiz(): void {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.gameFinished = false;
        this.shuffleQuestions();
        this.resetQuestionState();
        this.startTimer();
    }

    goHome(): void {
        this.router.navigate(['/']);
    }

    get currentQuestion(): QuizQuestion | null {
        return this.questions[this.currentQuestionIndex] || null;
    }

    get progress(): number {
        return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
    }

    ngOnDestroy(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    loadUserCreatedQuiz(): void {
        try {
            const quizId = this.quizType.replace('custom-', '');
            const quizKey = `custom-quiz-${quizId}`;
            const savedQuiz = localStorage.getItem(quizKey);
            
            if (!savedQuiz) {
                console.error('Quiz not found:', quizKey);
                this.router.navigate(['/quiz-choice']);
                return;
            }

            const quizData = JSON.parse(savedQuiz);
            this.quizTitle = quizData.name;
            this.maxQuestions = quizData.numberOfQuestions || 10;
            
            // Charger les questions basées sur la configuration du quiz
            this.loadCustomQuizQuestions(quizData.continents, quizData.languages);
            
        } catch (error) {
            console.error('Error loading user created quiz:', error);
            this.router.navigate(['/quiz-choice']);
        }
    }

    loadCustomQuizQuestions(continents: string[], languages: string[]): void {
        // Pour l'instant, utilisons une base de questions selon les continents/langues sélectionnés
        let selectedQuestions: QuizQuestion[] = [];
        
        // Questions par continent
        if (continents.includes('europe')) {
            this.loadEuropeQuestions();
            return;
        }
        
        if (continents.includes('africa') || languages.includes('french')) {
            this.loadFrancophoneQuestions();
            return;
        }
        
        // Par défaut, utiliser les questions du monde
        this.loadWorldQuestions();
    }
}