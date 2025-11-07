import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { delay, tap } from 'rxjs/operators'

export interface AppUser {
  name: string
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'app-users'
  private currentUserKey = 'current-user'
  private currentUserSubject = new BehaviorSubject<AppUser | null>(this.loadCurrentUser())

  public currentUser$ = this.currentUserSubject.asObservable()

  constructor() {}

  register(user: AppUser): Observable<AppUser> {
    const users = this.getStoredUsers()
    if (users.find(u => u.email === user.email)) {
      return throwError(() => new Error('Un compte avec cet email existe déjà'))
    }
    users.push(user)
    localStorage.setItem(this.storageKey, JSON.stringify(users))
    return of(user).pipe(delay(500))
  }

  login(email: string, password: string): Observable<AppUser> {
    const users = this.getStoredUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) {
      return throwError(() => new Error('Email ou mot de passe invalide'))
    }
    return of(found).pipe(
      delay(300),
      tap(u => {
        localStorage.setItem(this.currentUserKey, JSON.stringify(u))
        this.currentUserSubject.next(u)
      })
    )
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey)
    this.currentUserSubject.next(null)
  }

  getCurrentUser(): AppUser | null {
    return this.currentUserSubject.value
  }

  private loadCurrentUser(): AppUser | null {
    try {
      return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null')
    } catch {
      return null
    }
  }

  private getStoredUsers(): AppUser[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]')
    } catch {
      return []
    }
  }
}