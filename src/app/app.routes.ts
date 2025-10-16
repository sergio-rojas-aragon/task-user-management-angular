import { Routes } from '@angular/router';
import { ListaTareasComponent } from './Components/lista-tareas/lista-tareas.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', loadComponent: () => import('./Components/inicio/inicio.component').then(m => m.InicioComponent) },
    { path: 'tareas', component: ListaTareasComponent  }, 
    { path: 'login', component: LoginComponent }
];
