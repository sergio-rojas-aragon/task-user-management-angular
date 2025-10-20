import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas/tareas.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tarea } from '../../Models/tarea.model';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-tareas.component.html',
  styleUrl: './lista-tareas.component.scss'
})
export class ListaTareasComponent implements OnInit {
  tareas: Tarea[] = [];
  cargando = true;

  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {

    this.tareasService.obtenerTareas().subscribe({
      next: (data) => {
        console.log("data obtenida", data);

        this.tareas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener tareas:', err);
        this.cargando = false;
      }

    })
  }
}
