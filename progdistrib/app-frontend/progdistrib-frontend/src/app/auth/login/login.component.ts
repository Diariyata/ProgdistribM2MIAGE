import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class AuthLoginComponent implements OnInit {

  // sera initialisée plus tard dans ngOnInit
  loginFormGroup!: FormGroup;
  invalidCredentials: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  // Méthode du cycle de vie appelée automatiquement lors de l'initialisation du composant.
  // C'est l'endroit idéal pour effectuer des appels API ou initialiser des données.
  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      const { email, password } = this.loginFormGroup.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response && response.token) {
            //console.log('Token reçu :', response.token);  // Affichage du token dans la console
            localStorage.setItem('token', response.token);
            localStorage.setItem("role", response.role); // Sauvegarde du rôle
            
            if (response.role === 'Admin') {
              this.router.navigate(['/admin-dashboard']);
              console.log("admin-dashboard");
            } else {
              this.router.navigate(['/locataire-dashboard']);
              console.log("locataire-dashboard")
            }
          }
        },
        error: (error) => {
          this.invalidCredentials = true;
        }
      });
    }
  }
}