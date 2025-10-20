import { Routes } from '@angular/router';
import { ListaTareasComponent } from './Components/lista-tareas/lista-tareas.component';
import { LoginComponent } from './Components/login/login.component';
import { BienvenidoDashboardComponent } from './Components/bienvenido-dashboard/bienvenido-dashboard.component';
import { AuthGuard } from './guards/auth.guard.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', loadComponent: () => import('./Components/inicio/inicio.component').then(m => m.InicioComponent) },
    { path: 'tareas', 
            component: ListaTareasComponent, 
            canActivate: [AuthGuard]  }, 
    { path: 'login', component: LoginComponent },
    { path: 'bienvenido', component: BienvenidoDashboardComponent }
];
