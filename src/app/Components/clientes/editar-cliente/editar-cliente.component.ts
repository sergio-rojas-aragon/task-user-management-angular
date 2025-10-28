import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule, FormsModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.scss'
})
export class EditarClienteComponent implements OnInit {
  guardando = false;
  creadoOK = false;
  esconderForm = false;
  id!: string;

  private fb = inject(FormBuilder);
  clienteForm = this.fb.group({
    nombre: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]]
  });
  
  constructor (private clientesService : ClientesService, private router: Router, private route : ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id')!;
    const payload = await this.clientesService.obtenerClienteAsync(parseInt(this.id));
    console.log("payload", payload);
    this.clienteForm.patchValue(payload); 
  }


  async onSubmit() : Promise<void> {
    this.guardando = true;
    this.esconderForm = true;
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched;
      this.guardando = false;
      this.esconderForm = false;
      return;
    }
    const { nombre, email } = this.clienteForm.value;
    try {
      const payload = await this.clientesService.ActualizarClienteAsync(parseInt(this.id), { nombre, email });
      console.log("creado OK", payload);
      this.guardando = false;
      this.creadoOK = true;
      this.esperarYRedirigir("clientes");

    } catch (error) {
      console.error("error:", error);
    }

  }

esperarYRedirigir(url: string, tiempoMs: number = 4000): void {
  console.log(`Esperando ${tiempoMs / 1000} segundos antes de redirigir a /${url}...`);
  
  // 3. Usa setTimeout() para introducir el retardo
  setTimeout(() => {
    // 4. Dentro del callback, usa el Router para navegar
    this.router.navigate([`/${url}`]); 
    
    console.log(`Redirigiendo a /${url}`);
  }, tiempoMs);
}


}
