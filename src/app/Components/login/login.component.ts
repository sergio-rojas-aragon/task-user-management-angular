import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class LoginComponent {

  hide = true;

  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    usuario: [null, Validators.required],
    contrasena: [null, Validators.required]
  });

  constructor(private authService: AuthService) {
    
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched;
    }

    const { usuario, contrasena } = this.loginForm.value;

    this.authService.login({ usuario, contrasena }).subscribe({
      next: (response) => {
        console.log("exito");
      },
      error: (err) => {
        console.error("error", err);
        
        if (err.status === 401) {
              //this.errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
          } else {
              //this.errorMessage = 'Ocurrió un error al conectar con el servidor. Inténtalo más tarde.';
          }
        }
    })

    alert('Thanks!');
  }
}
