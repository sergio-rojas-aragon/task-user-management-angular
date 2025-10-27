import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from "@angular/router";
import { Cliente } from '../../../Models/cliente.model';
import { ClientesService } from '../../../services/clientes/clientes.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EliminarComponent } from '../../dialogs/eliminar/eliminar.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [RouterLink, CommonModule, MatProgressSpinnerModule, MatDialogModule, MatButtonModule],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss',
})
export class ListaClientesComponent {
  clientes: Cliente[] = [];
  cargando = true;

  readonly dialog = inject(MatDialog);

  constructor(private router: Router, private clientesService : ClientesService) {}


   ngOnInit(): void {
    this.cargaClientes();
   }

   cargaClientes() : void {
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

    async eliminarCliente(clienteId: number) : Promise <any> {
      const dialogRef = this.dialog.open(EliminarComponent);
      dialogRef.afterClosed().subscribe(async result => {
        console.log(`Dialog result: ${result}`);
        if (result) {

          try {
            const payload = await this.clientesService.EliminarClienteAsync(clienteId);
            console.log("eliminado");
            this.cargaClientes();
          } catch (error) {
            console.error("error:", error);
            console.error('Error al eliminar cliente:', error);
            this.cargando = false;
          } 
        }
    });

   }

   editarCliente( clienteId: number) : void {

   }

}
