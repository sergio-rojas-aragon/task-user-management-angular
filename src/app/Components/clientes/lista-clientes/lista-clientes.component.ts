import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from "@angular/router";
import { Cliente } from '../../../Models/cliente.model';
import { ClientesService } from '../../../services/clientes/clientes.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [RouterLink, CommonModule, MatProgressSpinnerModule],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent {
  clientes: Cliente[] = [];
  cargando = true;

  constructor(private router: Router, private clientesService : ClientesService) {}


   ngOnInit(): void {
      this.clientesService.obtenerCliente().subscribe({
        next: (data) => {
          console.log("data clientes", data);
          this.clientes = data;
          this.cargando = false;
        },
        error: (err) => {
        console.error('Error al obtener clientes:', err);
        this.cargando = false;
      }
      })
   }

}
