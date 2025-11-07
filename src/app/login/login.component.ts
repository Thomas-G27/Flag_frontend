import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { SettingsService } from '../services/settings.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  submitting = false
  error: string | null = null

  private langSub?: Subscription
  private translations: any = {}

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private settings: SettingsService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.translations = this.settings.getTranslation(this.settings.getCurrentLanguage()) || {}
    this.langSub = this.settings.language$.subscribe(lang => {
      this.translations = this.settings.getTranslation(lang) || {}
    })
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe()
  }

  get f(): { email: AbstractControl; password: AbstractControl } {
    return this.loginForm.controls as any
  }

  tr(path: string, fallback = ''): string {
    if (!this.translations) return fallback
    const parts = path.split('.')
    let cur: any = this.translations
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
      else return fallback
    }
    return typeof cur === 'string' ? cur : fallback
  }

  onSubmit(): void {
    this.error = null
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }
    this.submitting = true
    const { email, password } = this.loginForm.value
    this.userService.login(email, password).subscribe({
      next: () => {
        this.submitting = false
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.submitting = false
        this.error = err?.message || this.tr('inscription.error', 'Erreur lors de la connexion')
      }
    })
  }
}