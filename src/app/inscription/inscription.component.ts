import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../services/user.service'
import { SettingsService } from '../services/settings.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit, OnDestroy {
  inscriptionForm: FormGroup
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
    this.inscriptionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]],
      tos: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordsMatch })
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

  // typed controls -> permet d'utiliser f.name, f.email ... dans le template
  get f(): {
    name: AbstractControl
    email: AbstractControl
    password: AbstractControl
    confirm: AbstractControl
    tos: AbstractControl
  } {
    return this.inscriptionForm.controls as any
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

  private passwordsMatch(group: FormGroup) {
    return group.get('password')!.value === group.get('confirm')!.value ? null : { mismatch: true }
  }

  onSubmit(): void {
    this.error = null
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched()
      return
    }
    this.submitting = true
    const { name, email, password } = this.inscriptionForm.value
    this.userService.register({ name, email, password }).subscribe({
      next: () => {
        this.submitting = false
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.submitting = false
        this.error = err?.message || this.tr('inscription.error', "Erreur lors de l'inscription")
      }
    })
  }
}
