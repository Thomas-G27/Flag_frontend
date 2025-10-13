import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { AdminService, Quiz } from '../services/admin.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-quiz-choice',
    templateUrl: './quiz_choice.component.html',
    styleUrls: ['./quiz_choice.component.scss']
})
export class QuizChoiceComponent implements OnInit, OnDestroy {
    availableQuizzes: Quiz[] = [];
    isAdministrator: boolean = false;
    currentLanguage: string = 'fr';
    translations: any = {};
    
    private quizzesSubscription!: Subscription;
    private adminSubscription!: Subscription;
    private languageSubscription!: Subscription;

    constructor(
        private settingsService: SettingsService,
        public adminService: AdminService
    ) {}

    ngOnInit(): void {
        this.currentLanguage = this.settingsService.getCurrentLanguage();
        this.translations = this.settingsService.getTranslation(this.currentLanguage);
        this.isAdministrator = this.settingsService.getAdministratorMode();

        // Force la réinitialisation des quiz par défaut pour s'assurer qu'on a les nouveaux quiz
        this.adminService.resetToDefaultQuizzes();

        // S'abonner aux quiz disponibles
        this.quizzesSubscription = this.adminService.quizzes$.subscribe(quizzes => {
            this.availableQuizzes = this.adminService.getEnabledQuizzes();
        });

        // S'abonner au mode administrateur
        this.adminSubscription = this.settingsService.isAdministrator$.subscribe(isAdmin => {
            this.isAdministrator = isAdmin;
        });

        // S'abonner aux changements de langue
        this.languageSubscription = this.settingsService.language$.subscribe(lang => {
            this.currentLanguage = lang;
            this.translations = this.settingsService.getTranslation(lang);
        });
    }

    ngOnDestroy(): void {
        if (this.quizzesSubscription) {
            this.quizzesSubscription.unsubscribe();
        }
        if (this.adminSubscription) {
            this.adminSubscription.unsubscribe();
        }
        if (this.languageSubscription) {
            this.languageSubscription.unsubscribe();
        }
    }

    getQuizColor(quizId: string): string {
        const colorMap: { [key: string]: string } = {
            'world': '#dc2626',           // Rouge pour monde complet
            'europe-quick': '#2563eb',    // Bleu pour Europe
            'francophone-quick': '#7c3aed', // Violet pour francophone
            'continent-custom': '#0891b2',  // Cyan pour continents personnalisés
            'language-custom': '#16a34a',   // Vert pour langues personnalisées
            // Fallbacks pour anciens IDs
            'continent': '#0891b2',
            'language': '#16a34a'
        };
        
        // Quiz créés par l'utilisateur
        if (quizId.startsWith('custom-')) {
            return '#f59e0b'; // Orange pour quiz créés
        }
        
        return colorMap[quizId] || '#6b7280';
    }

    getQuizIcon(quizId: string): string {
        const iconMap: { [key: string]: string } = {
            'world': '🌍',              // Globe pour monde complet
            'europe-quick': '🇪🇺',      // Drapeau UE pour Europe
            'francophone-quick': '🇫🇷',  // Drapeau France pour francophone
            'continent-custom': '🗺️',    // Carte pour continents personnalisés
            'language-custom': '🗣️',     // Parole pour langues personnalisées
            // Fallbacks pour anciens IDs
            'continent': '🗺️',
            'language': '🗣️'
        };
        
        // Quiz créés par l'utilisateur
        if (quizId.startsWith('custom-')) {
            return '📝'; // Icône création pour quiz créés
        }
        
        return iconMap[quizId] || '🎯';
    }

    getQuizDescription(quiz: Quiz): string {
        return `${quiz.questions} questions - ${quiz.continent} - ${quiz.language}`;
    }

    getQuickQuizzes(): Quiz[] {
        return this.availableQuizzes.filter(quiz => 
            quiz.id === 'world' ||
            quiz.id === 'europe-quick' || 
            quiz.id === 'francophone-quick'
        );
    }

    getCustomQuizzes(): Quiz[] {
        return this.availableQuizzes.filter(quiz => 
            quiz.id === 'continent-custom' || 
            quiz.id === 'language-custom'
        );
    }

    getUserCreatedQuizzes(): Quiz[] {
        return this.availableQuizzes.filter(quiz => 
            quiz.id.startsWith('custom-')
        );
    }

    showQuizManager: boolean = false;
    showQuizCreator: boolean = false;
    newQuizData: any = {
        name: '',
        questions: 10,
        languages: [], // Array for multiple languages
        continents: [] // Array for multiple continents
    };

    openQuizManager(): void {
        this.showQuizManager = true;
    }

    openQuizCreator(): void {
        this.showQuizCreator = true;
    }

    closeQuizManager(): void {
        this.showQuizManager = false;
    }

    closeQuizCreator(): void {
        this.showQuizCreator = false;
        this.resetForm();
    }

    toggleQuiz(quizId: string): void {
        this.adminService.toggleQuizStatus(quizId);
    }

    removeQuiz(quizId: string): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
            this.adminService.removeQuiz(quizId);
        }
    }

    createNewQuiz(): void {
        const validation = this.adminService.validateQuizConfig(this.newQuizData);
        
        if (validation.valid) {
            this.adminService.addNewQuiz(this.newQuizData);
            this.resetForm();
            this.closeQuizCreator();
            const successMsg = this.translations?.admin?.quizCreated || `Quiz "${this.newQuizData.name}" créé avec succès !`;
            alert(successMsg + `\n${this.translations?.admin?.continents || 'Continents'}: ${this.newQuizData.continents.join(', ')}\n${this.translations?.admin?.languages || 'Langues'}: ${this.newQuizData.languages.join(', ')}`);
        } else {
            console.error('Erreurs de validation:', validation.errors);
            const errorMsg = this.translations?.admin?.formErrors || 'Erreurs dans le formulaire';
            alert(errorMsg + ':\n' + (validation.errors || []).join('\n'));
        }
    }

    resetForm(): void {
        this.newQuizData = {
            name: '',
            questions: 10,
            languages: [],
            continents: []
        };
    }

    toggleLanguage(language: string): void {
        const index = this.newQuizData.languages.indexOf(language);
        if (index > -1) {
            this.newQuizData.languages.splice(index, 1);
        } else {
            this.newQuizData.languages.push(language);
        }
    }

    isLanguageSelected(language: string): boolean {
        return this.newQuizData.languages.includes(language);
    }

    toggleContinent(continent: string): void {
        const index = this.newQuizData.continents.indexOf(continent);
        if (index > -1) {
            this.newQuizData.continents.splice(index, 1);
        } else {
            this.newQuizData.continents.push(continent);
        }
    }

    isContinentSelected(continent: string): boolean {
        return this.newQuizData.continents.includes(continent);
    }

    deleteUserQuiz(quizId: string): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
            this.adminService.removeQuiz(quizId);
        }
    }

}

