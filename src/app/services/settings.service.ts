import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private currentLanguage = new BehaviorSubject<string>('fr')
  private currentTheme = new BehaviorSubject<string>('light')
  private isAdministrator = new BehaviorSubject<boolean>(false)

  public language$ = this.currentLanguage.asObservable()
  public theme$ = this.currentTheme.asObservable()
  public isAdministrator$ = this.isAdministrator.asObservable()

  constructor() {
    // Charger les préférences sauvegardées
    const savedLanguage = localStorage.getItem('quiz-language') || 'fr'
    const savedTheme = localStorage.getItem('quiz-theme') || 'light'
    const savedAdminMode = localStorage.getItem('quiz-admin-mode') === 'true'
    
    this.setLanguage(savedLanguage)
    this.setTheme(savedTheme)
    this.setAdministratorMode(savedAdminMode)
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value
  }

  getCurrentTheme(): string {
    return this.currentTheme.value
  }

  getAdministratorMode(): boolean {
    return this.isAdministrator.value
  }

  setLanguage(language: string): void {
    this.currentLanguage.next(language)
    localStorage.setItem('quiz-language', language)
    this.updateDocumentLanguage(language)
  }

  setTheme(theme: string): void {
    this.currentTheme.next(theme)
    localStorage.setItem('quiz-theme', theme)
    this.updateDocumentTheme(theme)
  }

  setAdministratorMode(isAdmin: boolean): void {
    this.isAdministrator.next(isAdmin)
    localStorage.setItem('quiz-admin-mode', isAdmin.toString())
  }

  private updateDocumentLanguage(language: string): void {
    document.documentElement.lang = language
  }

  private updateDocumentTheme(theme: string): void {
    document.body.classList.remove('light-theme', 'dark-theme')
    document.body.classList.add(`${theme}-theme`)
  }

  getTranslation(language: string): any {
    const translations: { [lang: string]: any } = {
      'fr': {
        nav: {
          home: 'Accueil',
          quiz: 'Quiz Drapeaux',
          rules: 'Règles',
          hof: 'Hall of Fame'
        },
        home: {
          title: 'Quiz des Drapeaux',
          welcome: 'Testez vos connaissances des drapeaux du monde entier !',
          description1: 'Découvrez les drapeaux de différents pays et apprenez en vous amusant.',
          description2: 'Êtes-vous prêt à relever le défi ?',
          playButton: 'JOUER',
          rulesButton: 'RÈGLES',
          worldFlags: 'Drapeaux du Monde',
          worldFlagsDescription: 'Plus de 100 drapeaux de pays différents',
          scores: 'Scores',
          scoresDescription: 'Suivez vos performances et battez vos records',
          challenges: 'Défis',
          challengesDescription: 'Différents niveaux de difficulté'
        },
        rules: {
          title: 'Règles du Quiz Drapeaux',
          subtitle: 'Découvrez comment jouer et maximisez vos chances de réussite !',
          objective: 'Principe du Jeu',
          gameDescription: 'Le Quiz Drapeaux est un jeu de reconnaissance où vous devez identifier le pays correspondant au drapeau affiché.',
          step1: 'Un drapeau s\'affiche à l\'écran',
          step2: 'Vous tapez le nom du pays dans le champ de saisie',
          step3: 'Si c\'est correct, vous passez automatiquement au drapeau suivant',
          step4: 'Si vous ne trouvez pas, vous pouvez passer au suivant avec le bouton "Skip"',
          scoring: 'Système de Score',
          scoringDescription: 'Votre performance est évaluée selon plusieurs critères :',
          pointCorrect: 'Bonne réponse',
          pointIncorrect: 'Skip ou mauvaise réponse',
          pointFinal: 'Score final',
          pointFinalDesc: 'Nombre de bonnes réponses / Total',
          pointSeries: 'Série',
          pointSeriesDesc: 'Suivi de vos bonnes réponses consécutives',
          categories: 'Catégories Disponibles',
          continentTitle: 'Par Continent',
          continentDesc1: 'Europe, Asie, Amérique, Afrique, Océanie',
          continentDesc2: 'Découvrez les drapeaux région par région',
          continentDesc3: 'Parfait pour apprendre géographiquement',
          languageTitle: 'Par Langue',
          languageDesc1: 'Pays francophones, anglophones, hispanophones...',
          languageDesc2: 'Explorez les drapeaux selon les langues parlées',
          languageDesc3: 'Idéal pour les passionnés de langues',
          worldTitle: 'Monde Entier',
          worldDesc1: 'Tous les pays du monde mélangés',
          worldDesc2: 'Le défi ultime pour les experts',
          worldDesc3: 'Testez vos connaissances globales',
          howToPlay: 'Comment Jouer',
          controlInput: 'Saisie',
          controlInputDesc: 'Tapez le nom du pays et appuyez sur Entrée',
          controlSkip: 'Skip',
          controlSkipDesc: 'Cliquez sur "Skip" ou appuyez sur Espace pour passer',
          controlAuto: 'Auto',
          controlAutoDesc: 'Passage automatique au suivant si la réponse est correcte',
          controlScore: 'Score',
          controlScoreDesc: 'Votre progression s\'affiche en temps réel',
          tips: 'Conseils & Astuces',
          tipFast: 'Tapez rapidement',
          tipFastDesc: 'Pas besoin d\'être parfait : "france", "France" ou "FRANCE" fonctionnent',
          tipGeo: 'Pensez géographie',
          tipGeoDesc: 'Associez les couleurs et symboles à l\'histoire du pays',
          tipSkip: 'N\'hésitez pas à skip',
          tipSkipDesc: 'Mieux vaut passer et continuer que de rester bloqué',
          tipLearn: 'Apprenez en jouant',
          tipLearnDesc: 'Chaque drapeau vu est une connaissance acquise',
          startQuiz: 'Commencer le Quiz',
          backHome: 'Retour à l\'accueil'
          
        },
        quiz: {
          title: 'Quiz des Drapeaux',
          comingSoon: 'Le quiz sera bientôt disponible...',
          placeholder: 'Tapez le nom du pays...',
          submit: 'Valider',
          skip: 'Passer',
          score: 'Score',
          correct: 'Correct !',
          incorrect: 'Incorrect',
          gameOver: 'Fin du jeu !',
          yourScore: 'Votre score',
          restart: 'Recommencer',
          backHome: 'Retour à l\'accueil',
          back: 'Retour'
        },
        settings: {
          title: 'Paramètres',
          language: 'Langue',
          theme: 'Thème',
          light: 'Clair',
          dark: 'Sombre',
          administrator: 'Mode Administrateur',
          adminEnabled: 'Activé',
          adminDisabled: 'Désactivé'
        },
        hof: {
          title: 'Hall of Fame',
          backButton: 'Retour',
          backToHome: 'Retour à l\'accueil',
          clearScores: 'Effacer les scores',
          confirmClear: 'Êtes-vous sûr de vouloir effacer tous les scores ?',
          filterBy: 'Filtrer par quiz :',
          allQuizzes: 'Tous les quiz',
          rank: 'Rang',
          player: 'Joueur',
          score: 'Score',
          percentage: 'Pourcentage',
          quizType: 'Type de Quiz',
          time: 'Temps',
          date: 'Date',
          noScores: 'Aucun score enregistré',
          noScoresMessage: 'Jouez à un quiz pour voir vos scores ici !',
          playNow: 'Jouer maintenant',
          quizTypes: {
            world: 'Monde',
            europe: 'Europe',
            africa: 'Afrique'
          }
        },
        admin: {
          title: 'Administration',
          quizManagement: 'Gestion des Quiz',
          manageQuizzes: 'Gérer les Quiz',
          manageDescription: 'Activer/désactiver les quiz disponibles',
          createNewQuiz: 'Créer un Quiz',
          createDescription: 'Ajouter un nouveau quiz personnalisé',
          availableQuizzes: 'Quiz Disponibles',
          enableQuiz: 'Activer le quiz',
          disableQuiz: 'Désactiver le quiz',
          addNewQuiz: 'Créer un Quiz',
          hofManagement: 'Gestion Hall of Fame',
          removeScore: 'Supprimer ce score',
          confirmRemoveScore: 'Êtes-vous sûr de vouloir supprimer ce score ?',
          newQuizForm: {
            title: 'Créer un nouveau quiz',
            name: 'Nom du quiz',
            questions: 'Nombre de questions',
            languages: 'Langues',
            continent: 'Continent',
            save: 'Créer le quiz',
            cancel: 'Annuler'
          },
          quizCreated: 'Quiz créé avec succès !',
          continents: 'Continents',
          languages: 'Langues',
          formErrors: 'Erreurs dans le formulaire'
        },
        quiz_choice: {
          title: 'Choisissez votre Quiz',
          subtitle: 'Sélectionnez le type de quiz que vous souhaitez jouer',
          start: 'Commencer',
          customize: 'Personnaliser',
          backHome: 'Retour à l\'accueil'
        },
        continent_selection: {
          title: 'Sélection des Continents',
          description: 'Choisissez les continents pour votre quiz drapeaux',
          selectAll: 'Tout sélectionner',
          clearAll: 'Tout désélectionner',
          countries: 'pays',
          continentsSelected: 'continents sélectionnés',
          selectAtLeastOne: 'Veuillez sélectionner au moins un continent',
          startQuiz: 'Commencer le quiz'
        },
        language_selection: {
          title: 'Sélection des Langues',
          description: 'Choisissez les langues parlées dans les pays pour votre quiz',
          selectAll: 'Tout sélectionner',
          clearAll: 'Tout désélectionner',
          countries: 'pays',
          regions: 'Régions:',
          languagesSelected: 'langues sélectionnées',
          selectAtLeastOne: 'Veuillez sélectionner au moins une langue',
          startQuiz: 'Commencer le quiz'
        }
      },
      'en': {
        nav: {
          home: 'Home',
          quiz: 'Flag Quiz',
          rules: 'Rules',
          hof: 'Hall of Fame'
        },
        home: {
          title: 'Flag Quiz',
          welcome: 'Test your knowledge of flags from around the world!',
          description1: 'Discover flags from different countries and learn while having fun.',
          description2: 'Are you ready to take on the challenge?',
          playButton: 'PLAY',
          rulesButton: 'RULES',
          worldFlags: 'World Flags',
          worldFlagsDescription: 'Over 100 flags from different countries',
          scores: 'Scores',
          scoresDescription: 'Track your performance and beat your records',
          challenges: 'Challenges',
          challengesDescription: 'Different levels of difficulty'
        },
        rules: {
          title: 'Flag Quiz Rules',
          subtitle: 'Learn how to play and maximize your chances of success!',
          objective: 'Game Principle',
          gameDescription: 'The Flag Quiz is a recognition game where you must identify the country corresponding to the displayed flag.',
          step1: 'A flag is displayed on the screen',
          step2: 'You type the country name in the input field',
          step3: 'If correct, you automatically move to the next flag',
          step4: 'If you can\'t find it, you can skip to the next one with the "Skip" button',
          scoring: 'Scoring System',
          scoringDescription: 'Your performance is evaluated according to several criteria:',
          pointCorrect: 'Correct answer',
          pointIncorrect: 'Skip or wrong answer',
          pointFinal: 'Final score',
          pointFinalDesc: 'Number of correct answers / Total',
          pointSeries: 'Streak',
          pointSeriesDesc: 'Track your consecutive correct answers',
          categories: 'Available Categories',
          continentTitle: 'By Continent',
          continentDesc1: 'Europe, Asia, America, Africa, Oceania',
          continentDesc2: 'Discover flags by region',
          continentDesc3: 'Perfect for learning geographically',
          languageTitle: 'By Language',
          languageDesc1: 'French-speaking, English-speaking, Spanish-speaking countries...',
          languageDesc2: 'Explore flags by spoken languages',
          languageDesc3: 'Ideal for language enthusiasts',
          worldTitle: 'Whole World',
          worldDesc1: 'All countries of the world mixed',
          worldDesc2: 'The ultimate challenge for experts',
          worldDesc3: 'Test your global knowledge',
          howToPlay: 'How to Play',
          controlInput: 'Input',
          controlInputDesc: 'Type the country name and press Enter',
          controlSkip: 'Skip',
          controlSkipDesc: 'Click "Skip" or press Space to pass',
          controlAuto: 'Auto',
          controlAutoDesc: 'Automatic move to next if answer is correct',
          controlScore: 'Score',
          controlScoreDesc: 'Your progress displays in real time',
          tips: 'Tips & Tricks',
          tipFast: 'Type quickly',
          tipFastDesc: 'No need to be perfect: "france", "France" or "FRANCE" all work',
          tipGeo: 'Think geography',
          tipGeoDesc: 'Associate colors and symbols with the country\'s history',
          tipSkip: 'Don\'t hesitate to skip',
          tipSkipDesc: 'Better to pass and continue than to stay stuck',
          tipLearn: 'Learn by playing',
          tipLearnDesc: 'Every flag seen is knowledge gained',
          startQuiz: 'Start Quiz',
          backHome: 'Back to home'
        },
        quiz: {
          title: 'Flag Quiz',
          comingSoon: 'The quiz will be available soon...',
          placeholder: 'Type the country name...',
          submit: 'Submit',
          skip: 'Skip',
          score: 'Score',
          correct: 'Correct!',
          incorrect: 'Incorrect',
          gameOver: 'Game Over !',
          yourScore: 'Your score',
          restart: 'Restart',
          backHome: 'Back to home',
          back: 'Back'
        },
        settings: {
          title: 'Settings',
          language: 'Language',
          theme: 'Theme',
          light: 'Light',
          dark: 'Dark',
          administrator: 'Administrator Mode',
          adminEnabled: 'Enabled',
          adminDisabled: 'Disabled'
        },
        hof: {
          title: 'Hall of Fame',
          backButton: 'Back',
          backToHome: 'Back to home',
          clearScores: 'Clear scores',
          confirmClear: 'Are you sure you want to clear all scores?',
          filterBy: 'Filter by quiz:',
          allQuizzes: 'All quizzes',
          rank: 'Rank',
          player: 'Player',
          score: 'Score',
          percentage: 'Percentage',
          quizType: 'Quiz Type',
          time: 'Time',
          date: 'Date',
          noScores: 'No scores recorded',
          noScoresMessage: 'Play a quiz to see your scores here!',
          playNow: 'Play now',
          quizTypes: {
            world: 'World',
            europe: 'Europe',
            africa: 'Africa'
          }
        },
        admin: {
          title: 'Administration',
          quizManagement: 'Quiz Management',
          manageQuizzes: 'Manage Quizzes',
          manageDescription: 'Enable/disable available quizzes',
          createNewQuiz: 'Create Quiz',
          createDescription: 'Add a new custom quiz',
          availableQuizzes: 'Available Quizzes',
          enableQuiz: 'Enable quiz',
          disableQuiz: 'Disable quiz',
          addNewQuiz: 'Create Quiz',
          hofManagement: 'Hall of Fame Management',
          removeScore: 'Remove this score',
          confirmRemoveScore: 'Are you sure you want to remove this score?',
          newQuizForm: {
            title: 'Create new quiz',
            name: 'Quiz name',
            questions: 'Number of questions',
            languages: 'Languages',
            continent: 'Continent',
            save: 'Create quiz',
            cancel: 'Cancel'
          },
          quizCreated: 'Quiz created successfully!',
          continents: 'Continents',
          languages: 'Languages',
          formErrors: 'Form errors'
        },
        quiz_choice: {
          title: 'Choose your Quiz',
          subtitle: 'Select the type of quiz you want to play',
          start: 'Start',
          customize: 'Customize',
          backHome: 'Back to home'
        },
        continent_selection: {
          title: 'Continent Selection',
          description: 'Choose continents for your flag quiz',
          selectAll: 'Select All',
          clearAll: 'Clear All',
          countries: 'countries',
          continentsSelected: 'continents selected',
          selectAtLeastOne: 'Please select at least one continent',
          startQuiz: 'Start Quiz'
        },
        language_selection: {
          title: 'Language Selection',
          description: 'Choose languages spoken in countries for your quiz',
          selectAll: 'Select All',
          clearAll: 'Clear All',
          countries: 'countries',
          regions: 'Regions:',
          languagesSelected: 'languages selected',
          selectAtLeastOne: 'Please select at least one language',
          startQuiz: 'Start Quiz'
        }
      },
      'es': {
        nav: {
          home: 'Inicio',
          quiz: 'Quiz Banderas',
          rules: 'Reglas',
          hof: 'Hall of Fame'
        },
        home: {
          title: 'Quiz de Banderas',
          description1: 'Descubre las banderas de diferentes países y aprende divirtiéndote.',
          description2: '¿Estás listo para aceptar el desafío?',
          playButton: 'JUGAR',
          rulesButton: 'REGLAS',
          worldFlags: 'Banderas del Mundo',
          worldFlagsDescription: 'Más de 100 banderas de diferentes países',
          scores: 'Puntuaciones',
          scoresDescription: 'Sigue tu rendimiento y supera tus récords',
          challenges: 'Desafíos',
          challengesDescription: 'Diferentes niveles de dificultad'
          
        },
        rules: {
          title: 'Reglas del Quiz de Banderas',
          subtitle: '¡Descubre cómo jugar y maximiza tus posibilidades de éxito!',
          objective: 'Principio del Juego',
          gameDescription: 'El Quiz de Banderas es un juego de reconocimiento donde debes identificar el país correspondiente a la bandera mostrada.',
          step1: 'Se muestra una bandera en la pantalla',
          step2: 'Escribes el nombre del país en el campo de entrada',
          step3: 'Si es correcto, pasas automáticamente a la siguiente bandera',
          step4: 'Si no lo encuentras, puedes pasar al siguiente con el botón "Skip"',
          scoring: 'Sistema de Puntuación',
          scoringDescription: 'Tu rendimiento se evalúa según varios criterios:',
          pointCorrect: 'Respuesta correcta',
          pointIncorrect: 'Saltar o respuesta incorrecta',
          pointFinal: 'Puntuación final',
          pointFinalDesc: 'Número de respuestas correctas / Total',
          pointSeries: 'Racha',
          pointSeriesDesc: 'Seguimiento de tus respuestas correctas consecutivas',
          categories: 'Categorías Disponibles',
          continentTitle: 'Por Continente',
          continentDesc1: 'Europa, Asia, América, África, Oceanía',
          continentDesc2: 'Descubre las banderas por región',
          continentDesc3: 'Perfecto para aprender geográficamente',
          languageTitle: 'Por Idioma',
          languageDesc1: 'Países francófonos, anglófonos, hispanohablantes...',
          languageDesc2: 'Explora las banderas según los idiomas hablados',
          languageDesc3: 'Ideal para los entusiastas de los idiomas',
          worldTitle: 'Mundo Entero',
          worldDesc1: 'Todos los países del mundo mezclados',
          worldDesc2: 'El desafío definitivo para expertos',
          worldDesc3: 'Pon a prueba tus conocimientos globales',
          howToPlay: 'Cómo Jugar',
          controlInput: 'Entrada',
          controlInputDesc: 'Escribe el nombre del país y presiona Enter',
          controlSkip: 'Saltar',
          controlSkipDesc: 'Haz clic en "Skip" o presiona Espacio para pasar',
          controlAuto: 'Auto',
          controlAutoDesc: 'Movimiento automático al siguiente si la respuesta es correcta',
          controlScore: 'Puntuación',
          controlScoreDesc: 'Tu progreso se muestra en tiempo real',
          tips: 'Consejos y Trucos',
          tipFast: 'Escribe rápidamente',
          tipFastDesc: 'No necesitas ser perfecto: "francia", "Francia" o "FRANCIA" funcionan',
          tipGeo: 'Piensa en geografía',
          tipGeoDesc: 'Asocia colores y símbolos con la historia del país',
          tipSkip: 'No dudes en saltar',
          tipSkipDesc: 'Es mejor pasar y continuar que quedarse atascado',
          tipLearn: 'Aprende jugando',
          tipLearnDesc: 'Cada bandera vista es conocimiento adquirido',
          startQuiz: 'Comenzar Quiz',
          backHome: 'Volver al inicio'
        },
        quiz: {
          title: 'Quiz de Banderas',
          welcome: '¡Bienvenido al quiz de banderas! Pon a prueba tus conocimientos.',
          comingSoon: 'El quiz estará disponible pronto...',
          placeholder: 'Escribe el nombre del país...',
          submit: 'Enviar',
          skip: 'Saltar',
          score: 'Puntuación',
          correct: '¡Correcto!',
          incorrect: 'Incorrecto',
          gameOver: '¡Fin del juego!',
          yourScore: 'Tu puntuación',
          restart: 'Reiniciar',
          backHome: 'Volver al inicio',
          back: 'Volver'
        },
        settings: {
          title: 'Configuración',
          language: 'Idioma',
          theme: 'Tema',
          light: 'Claro',
          dark: 'Oscuro',
          administrator: 'Modo Administrador',
          adminEnabled: 'Activado',
          adminDisabled: 'Desactivado'
        },
        hof: {
          title: 'Hall of Fame',
          backButton: 'Volver',
          backToHome: 'Volver al inicio',
          clearScores: 'Limpiar puntuaciones',
          confirmClear: '¿Estás seguro de que quieres limpiar todas las puntuaciones?',
          filterBy: 'Filtrar por quiz:',
          allQuizzes: 'Todos los quiz',
          rank: 'Rango',
          player: 'Jugador',
          score: 'Puntuación',
          percentage: 'Porcentaje',
          quizType: 'Tipo de Quiz',
          time: 'Tiempo',
          date: 'Fecha',
          noScores: 'No hay puntuaciones registradas',
          noScoresMessage: '¡Juega un quiz para ver tus puntuaciones aquí!',
          playNow: 'Jugar ahora',
          quizTypes: {
            world: 'Mundo',
            europe: 'Europa',
            africa: 'África'
          }
        },
        admin: {
          title: 'Administración',
          quizManagement: 'Gestión de Quiz',
          manageQuizzes: 'Gestionar Quiz',
          manageDescription: 'Activar/desactivar quiz disponibles',
          createNewQuiz: 'Crear Quiz',
          createDescription: 'Añadir un nuevo quiz personalizado',
          availableQuizzes: 'Quiz Disponibles',
          enableQuiz: 'Activar quiz',
          disableQuiz: 'Desactivar quiz',
          addNewQuiz: 'Crear Quiz',
          hofManagement: 'Gestión Hall of Fame',
          removeScore: 'Eliminar esta puntuación',
          confirmRemoveScore: '¿Estás seguro de que quieres eliminar esta puntuación?',
          newQuizForm: {
            title: 'Crear nuevo quiz',
            name: 'Nombre del quiz',
            questions: 'Número de preguntas',
            languages: 'Idiomas',
            continent: 'Continente',
            save: 'Crear quiz',
            cancel: 'Cancelar'
          },
          quizCreated: '¡Quiz creado exitosamente!',
          continents: 'Continentes',
          languages: 'Idiomas',
          formErrors: 'Errores en el formulario'
        },
        quiz_choice: {
          title: 'Elige tu Quiz',
          subtitle: 'Selecciona el tipo de quiz que quieres jugar',
          start: 'Comenzar',
          customize: 'Personalizar',
          backHome: 'Volver al inicio'
        },
        continent_selection: {
          title: 'Selección de Continentes',
          description: 'Elige los continentes para tu quiz de banderas',
          selectAll: 'Seleccionar Todo',
          clearAll: 'Limpiar Todo',
          countries: 'países',
          continentsSelected: 'continentes seleccionados',
          selectAtLeastOne: 'Por favor selecciona al menos un continente',
          startQuiz: 'Comenzar Quiz'
        },
        language_selection: {
          title: 'Selección de Idiomas',
          description: 'Elige los idiomas hablados en países para tu quiz',
          selectAll: 'Seleccionar Todo',
          clearAll: 'Limpiar Todo',
          countries: 'países',
          regions: 'Regiones:',
          languagesSelected: 'idiomas seleccionados',
          selectAtLeastOne: 'Por favor selecciona al menos un idioma',
          startQuiz: 'Comenzar Quiz'
        }
      }
    }

    return translations[language] || translations['fr']
  }
}