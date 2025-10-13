import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Quiz {
  id: string;
  name: string;
  enabled: boolean;
  questions: number;
  language: string;
  continent: string;
  route: string;
  title?: string;
  maxQuestions?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private availableQuizzes = new BehaviorSubject<Quiz[]>([]);
  public quizzes$ = this.availableQuizzes.asObservable();

  constructor() {
    this.loadQuizzes();
  }

  private loadQuizzes(): void {
    const savedQuizzes = localStorage.getItem('quiz-available-quizzes');
    
    if (savedQuizzes) {
      this.availableQuizzes.next(JSON.parse(savedQuizzes));
    } else {
      // Quiz par défaut - 5 types de quiz
      const defaultQuizzes: Quiz[] = [
        // Quiz rapides
        {
          id: 'world',
          name: 'Quiz Monde Complet',
          title: 'Quiz Monde',
          enabled: true,
          questions: 15,
          maxQuestions: 15,
          language: 'Toutes langues',
          continent: 'Tous les drapeaux du monde',
          route: '/quiz/world'
        },
        {
          id: 'europe-quick',
          name: 'Quiz Europe Express',
          title: 'Quiz Europe',
          enabled: true,
          questions: 10,
          maxQuestions: 10,
          language: 'Toutes langues',
          continent: 'Europe uniquement',
          route: '/quiz/europe'
        },
        {
          id: 'francophone-quick',
          name: 'Quiz Pays Francophones',
          title: 'Quiz Francophone',
          enabled: true,
          questions: 10,
          maxQuestions: 10,
          language: 'Français',
          continent: 'Pays francophones',
          route: '/quiz/francophone'
        },
        // Options personnalisées
        {
          id: 'continent-custom',
          name: 'Quiz Continents Personnalisé',
          title: 'Quiz Continental',
          enabled: true,
          questions: 10,
          maxQuestions: 10,
          language: 'Toutes langues',
          continent: 'Sélection personnalisée',
          route: '/continent-selection'
        },
        {
          id: 'language-custom',
          name: 'Quiz Langues Personnalisé',
          title: 'Quiz Linguistique',
          enabled: true,
          questions: 10,
          maxQuestions: 10,
          language: 'Sélection personnalisée',
          continent: 'Selon langues choisies',
          route: '/language-selection'
        }
      ];
      
      this.availableQuizzes.next(defaultQuizzes);
      this.saveQuizzes(defaultQuizzes);
    }
  }

  private saveQuizzes(quizzes: Quiz[]): void {
    localStorage.setItem('quiz-available-quizzes', JSON.stringify(quizzes));
  }

  getQuizzes(): Quiz[] {
    return this.availableQuizzes.value;
  }

  getQuizByType(type: string): Quiz | undefined {
    const quizzes = this.availableQuizzes.value;
    
    // Mappage des types d'URL vers les IDs de quiz
    const typeMapping: { [key: string]: string } = {
      'world': 'world',
      'europe': 'europe-quick', 
      'francophone': 'francophone-quick',
      'continent-custom': 'continent-custom',
      'language-custom': 'language-custom'
    };
    
    const quizId = typeMapping[type] || type;
    return quizzes.find(quiz => quiz.id === quizId);
  }

  updateQuiz(updatedQuiz: Quiz): void {
    const quizzes = this.availableQuizzes.value;
    const index = quizzes.findIndex(q => q.id === updatedQuiz.id);
    
    if (index !== -1) {
      quizzes[index] = updatedQuiz;
      this.availableQuizzes.next([...quizzes]);
      this.saveQuizzes(quizzes);
    }
  }

  addQuiz(newQuiz: Quiz): void {
    const quizzes = this.availableQuizzes.value;
    quizzes.push(newQuiz);
    this.availableQuizzes.next([...quizzes]);
    this.saveQuizzes(quizzes);
  }

  deleteQuiz(quizId: string): void {
    const quizzes = this.availableQuizzes.value;
    const filteredQuizzes = quizzes.filter(q => q.id !== quizId);
    this.availableQuizzes.next(filteredQuizzes);
    this.saveQuizzes(filteredQuizzes);
  }

  resetToDefaultQuizzes(): void {
    localStorage.removeItem('quiz-available-quizzes');
    this.loadQuizzes();
  }

  // Méthodes supplémentaires pour QuizChoiceComponent
  getAllQuizzes(): Quiz[] {
    return this.getQuizzes();
  }

  getEnabledQuizzes(): Quiz[] {
    return this.availableQuizzes.value.filter(quiz => quiz.enabled);
  }

  toggleQuizStatus(quizId: string): void {
    const quizzes = this.availableQuizzes.value;
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      quiz.enabled = !quiz.enabled;
      this.availableQuizzes.next([...quizzes]);
      this.saveQuizzes(quizzes);
    }
  }

  removeQuiz(quizId: string): void {
    this.deleteQuiz(quizId);
  }

  validateQuizConfig(config: any): { valid: boolean; errors?: string[] } {
    const errors: string[] = [];
    
    if (!config.name || config.name.trim() === '') {
      errors.push('Le nom du quiz est requis');
    }
    
    if (!config.questions || config.questions < 1) {
      errors.push('Le nombre de questions doit être supérieur à 0');
    }
    
    if (!config.languages || !Array.isArray(config.languages) || config.languages.length === 0) {
      errors.push('Au moins une langue doit être sélectionnée');
    }
    
    if (!config.continents || !Array.isArray(config.continents) || config.continents.length === 0) {
      errors.push('Au moins un continent doit être sélectionné');
    }
    
    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  addNewQuiz(quizData: any): void {
    const timestamp = Date.now();
    const newQuiz: Quiz = {
      id: `custom-${timestamp}`,
      name: quizData.name,
      enabled: true,
      questions: quizData.questions,
      maxQuestions: quizData.questions,
      language: quizData.languages.join(', '), // Joindre les langues sélectionnées
      continent: quizData.continents.join(', '), // Joindre les continents sélectionnés
      route: `/quiz/custom-${timestamp}`, // Route pour le quiz personnalisé
      title: quizData.name
    };
    
    // Stocker aussi les données détaillées du quiz pour le QuizComponent
    const quizDetails = {
      ...quizData,
      id: `custom-${timestamp}`,
      timestamp: timestamp
    };
    localStorage.setItem(`quiz-details-custom-${timestamp}`, JSON.stringify(quizDetails));
    
    this.addQuiz(newQuiz);
  }

  getAvailableContinents(): string[] {
    return [
      'Afrique',
      'Amérique du Nord',
      'Amérique du Sud', 
      'Asie',
      'Europe',
      'Océanie',
      'Tous les continents'
    ];
  }

  getAvailableLanguages(): string[] {
    return [
      'Français',
      'Anglais',
      'Espagnol',
      'Allemand',
      'Italien',
      'Portugais',
      'Arabe',
      'Chinois',
      'Japonais',
      'Toutes langues'
    ];
  }
}