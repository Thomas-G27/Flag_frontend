import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService, user } from '../services/user.service';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
    connexionForm!: FormGroup;
    submitting = false;
    error: string | null = null;
    successMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService) {}

    ngOnInit(): void {
        this.connexionForm = this.fb.group({
            name: [''],
            password: ['']
        })
    }

    get f() { return this.connexionForm.controls;}

    onSubmit(): void {
        if (this.connexionForm.invalid) {
        this.connexionForm.markAllAsTouched();
        return;
        }

        this.submitting = true;
        this.error = null;

        this.authService.login(this.f['name'].value, this.f['password'].value).subscribe({
            next: (res) => {
                this.submitting = false;
                this.successMessage = res.message || 'Connexion réussie !';
                this.connexionForm.reset();

                //Stockage du token JWT dans le localStorage
                localStorage.setItem('jwt_token', res.token);
                
                // Le message disparaît après 1 secondes
                setTimeout(() => this.successMessage = null, 1000);

                // Redirige veres la page home
                window.location.href = '/home';
            },
            error: (err) => {
                this.submitting = false;
                console.error(err);
                this.error = err?.error.message || "Erreur lors de l'inscription. Veuillez réessayer.";
            }
        });
    }
}