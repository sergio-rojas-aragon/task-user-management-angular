import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../../Models/tarea.model';



@Injectable({
  providedIn: 'root'
})

export class TareasService {

  private apiUrl = "https://localhost:7240/api/Tareas";

  constructor(private http: HttpClient) { }

  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }
}
