import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "https://localhost:7240/api/Tareas";

  constructor(private http: HttpClient) { }


  login(credentials: any) : Observable<any>{

    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response && response.token){
          this.saveToken(response.token);
        }
      })
    )
  }

  private saveToken(token:string): void {
    localStorage.setItem('auth_token', token);
    console.log('token guardado');
  }

}
