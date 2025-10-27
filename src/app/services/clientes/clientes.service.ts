import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Cliente } from '../../Models/cliente.model';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = "https://localhost:7240/api/cliente";

  constructor(private http: HttpClient, private authService : AuthService) { }

  obtenerCliente(): Observable<Cliente[]> {

    // const token = this.authService.getToken();
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // })
    return this.http.get<Cliente[]>(this.apiUrl, {headers: this.getHeaders() });
  }

  async CrearClienteAsync(credentials: any) : Promise <any> {
    return await firstValueFrom(this.http.post<any>(
        this.apiUrl, 
        credentials,
        { headers: this.getHeaders() }

      ));
  }
  async EliminarClienteAsync(id : number) : Promise <any> {
    return await firstValueFrom(this.http.delete<any>(
        this.apiUrl + '/' + id, 
        { headers: this.getHeaders() }
      ));
  }
  

  getHeaders() : any {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return headers;
  }

}
