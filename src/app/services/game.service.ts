import { Injectable } from '@angular/core'

export interface GameEntry {
  username: string
  score: number
  total: number
  mode: string
  dateISO: string
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private storageKey = 'flag-quiz-games'

  addGame(entry: GameEntry): void {
    const all = this.getAll()
    all.push(entry)
    localStorage.setItem(this.storageKey, JSON.stringify(all))
  }

  getAll(): GameEntry[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]')
    } catch {
      return []
    }
  }

  getByUsername(username: string): GameEntry[] {
    return this.getAll().filter(g => g.username?.toLowerCase() === username.toLowerCase())
  }

  getTop(limit = 50): GameEntry[] {
    return this.getAll()
      .slice()
      .sort((a, b) => b.score - a.score || (new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()))
      .slice(0, limit)
  }
}
