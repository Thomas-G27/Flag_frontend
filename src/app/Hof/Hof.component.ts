import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Subscription } from 'rxjs';
import { GameEntry, GameService } from '../services/game.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'hof',
  templateUrl: './hof.component.html',
  styleUrls: ['./hof.component.scss']
})
export class HofComponent implements OnInit, OnDestroy {
  translations: any = {}
  private langSub?: Subscription

  usernameFilter = ''
  games: GameEntry[] = []
  filtered: GameEntry[] = []

  constructor(
    private settings: SettingsService,
    private gameService: GameService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.translations = this.settings.getTranslation(this.settings.getCurrentLanguage())
    this.langSub = this.settings.language$.subscribe(lang => {
      this.translations = this.settings.getTranslation(lang)
    })

    // default to current user if exists
    const current = this.userService.getCurrentUser()
    this.usernameFilter = current?.name || ''
    this.refresh()
  }

  ngOnDestroy(): void { this.langSub?.unsubscribe() }

  tr(path: string, fallback = ''): string {
    const parts = path.split('.')
    let cur: any = this.translations
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
      else return fallback
    }
    return typeof cur === 'string' ? cur : fallback
  }

  onFilterChange(): void { this.refresh() }

  private refresh(): void {
    const all = this.gameService.getAll()
    const base = this.usernameFilter ? all.filter(g => g.username?.toLowerCase() === this.usernameFilter.toLowerCase()) : all
    this.games = base
    this.filtered = base
      .slice()
      .sort((a, b) => b.score - a.score || (new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()))
  }
}
