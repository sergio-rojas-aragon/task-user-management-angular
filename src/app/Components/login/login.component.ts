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
import { Router } from '@angular/router';


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
    email: [null, Validators.required],
    contrasena: [null, Validators.required]
  });

  constructor(private authService: AuthService, private router: Router) {
    
  }


  async onSubmit() : Promise<void> {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched;
      return;
    }

    const { email, contrasena } = this.loginForm.value;

    const password = contrasena;

    try {
      const payload = await this.authService.LoginAsync({ email, password });
      console.log("login OK", payload);
      this.authService.saveToken(payload.access_token);
      this.authService.saveUserData(payload);
      this.router.navigate(['/bienvenido']);
      
    } catch (error) {
      console.error("error:", error);
    }

  }
}
