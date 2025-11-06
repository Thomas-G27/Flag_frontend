import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'services/settings.service';


@Component({
    selector: 'app-quiz-choice',
    templateUrl: './quiz_choice.component.html',
    styleUrls: ['./quiz_choice.component.scss']
})
export class QuizChoiceComponent implements OnInit {

    constructor(private settingsService: SettingsService) {}
    
    quizTypes = [
        {
            id: 'world',
            name: 'Drapeaux du Monde',
            description: 'Tous les drapeaux des pays du monde',
            icon: '🌍',
            href: '/quiz/world',
            color: '#dc2626'
        },
        {
            id: 'continent',
            name: 'Continent',
            description: 'Drapeaux des pays européens',
            icon: '🇪🇺',
            href: '/quiz/europe',
            color: '#2563eb'
        },
        {
            id: 'language',
            name: 'Langue',
            description: 'Drapeaux des pays africains',
            icon: '🌍',
            href: '/quiz/africa',
            color: '#16a34a'
        }
    ];

    currentLanguage: string = 'fr';
    translations: any = {};

    ngOnInit(): void {
        this.translations = this.settingsService.getTranslation(this.currentLanguage);
    }

}

