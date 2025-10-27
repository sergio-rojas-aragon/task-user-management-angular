import { Routes } from '@angular/router';
import { ListaTareasComponent } from './Components/tareas/lista-tareas/lista-tareas.component';
import { LoginComponent } from './Components/login/login.component';
import { BienvenidoDashboardComponent } from './Components/bienvenido-dashboard/bienvenido-dashboard.component';
import { AuthGuard } from './guards/auth.guard.guard';
import { NuevaTareaComponent } from './Components/tareas/nueva-tarea/nueva-tarea.component';
import { ListaClientesComponent } from './Components/clientes/lista-clientes/lista-clientes.component';
import { NuevoClienteComponent } from './Components/clientes/nuevo-cliente/nuevo-cliente.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', loadComponent: () => import('./Components/inicio/inicio.component').then(m => m.InicioComponent) },
    { path: 'tareas', 
            component: ListaTareasComponent, 
            canActivate: [AuthGuard]  }, 
    { path: 'tareas/nueva-tarea', 
            component: NuevaTareaComponent, 
            canActivate: [AuthGuard]  }, 
    { path: 'clientes', 
            component: ListaClientesComponent, 
            canActivate: [AuthGuard]  }, 
    { path: 'clientes/nuevo-cliente', 
            component: NuevoClienteComponent, 
            canActivate: [AuthGuard]  }, 
    { path: 'login', component: LoginComponent },
    { path: 'bienvenido', component: BienvenidoDashboardComponent }
];
