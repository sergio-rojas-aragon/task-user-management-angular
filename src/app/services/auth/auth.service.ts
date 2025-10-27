import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = "https://localhost:7240/api/Auth/login";

  constructor(private http: HttpClient) { }


  // login(credentials: any) : Observable<any>{

  //   return this.http.post<any>(this.apiUrl, credentials).pipe(
  //     tap(response => {
  //       if (response && response.token){
  //         this.saveToken(response.token);
  //       }
  //     })
  //   )
  // }

  // otra forma sin obserbable


  async LoginAsync(credentials: any) : Promise <any> {
    return await firstValueFrom(this.http.post<any>(this.apiUrl, credentials));
  }



  saveToken(token:string): void {
    localStorage.setItem('auth_token', token);
    console.log('token guardado');
  }

  saveUserData( payload: any) : void {

    localStorage.setItem("idUsuario", payload.auth.id);
    localStorage.setItem("nombre", payload.auth.nombre);
    localStorage.setItem("email", payload.auth.email);
    localStorage.setItem("rolId", payload.auth.rolDTO.rolId);
    localStorage.setItem("RolName", payload.auth.rolDTO.nombre);
    console.log('datos guardados', this.getUserData());

  }

  logout() : void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("email");
    localStorage.removeItem("rolId");
    localStorage.removeItem("RolName");
    console.log("logOut",localStorage.getItem("auth_token") );
  }
  
  getUserData() : any {
    return {
      idUsuario: localStorage.getItem("idUsuario"),
      nombre: localStorage.getItem("nombre"),
      email: localStorage.getItem("email"),
      rolId: localStorage.getItem("rolId"),
      RolName: localStorage.getItem("RolName"),

    }

  }
  
  getToken() : string | null {
    return localStorage.getItem("auth_token");
  }

  isLoggedIn () : boolean {
    const token = localStorage.getItem("auth_token");
    //console.log("isLoggedIn", token);
    if (token) {
      return true;
    }
    return false;
  }

}
