import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet, ListaTareasComponent],
  imports: [CommonModule, RouterOutlet, RouterLink, MatSlideToggleModule,
    MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gtu';

  constructor( private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
  }


  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get isAuthenticated() : boolean {
    return this.authService.isLoggedIn();
  }

}
