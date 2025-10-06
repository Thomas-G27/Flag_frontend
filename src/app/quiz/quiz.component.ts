import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from "../services/settings.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit, OnDestroy {
    currentLanguage: string = 'fr'
    translations: any = {}
    private languageSubscription!: Subscription

    constructor(private settingsService: SettingsService) { }

    ngOnInit(): void {
        this.languageSubscription = this.settingsService.language$.subscribe(lang => {
            this.currentLanguage = lang
            this.translations = this.settingsService.getTranslation(lang)
        })
    }

    ngOnDestroy(): void {
        if (this.languageSubscription) {
            this.languageSubscription.unsubscribe()
        }
    }
}