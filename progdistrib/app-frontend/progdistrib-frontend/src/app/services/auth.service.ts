import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {email, password})
  }

  // Vérifie si un token est présent dans le localStorage et retourne true si trouvé, false sinon.
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole() {
    const role = localStorage.getItem("role")
    console.log("Rôle récupéré depuis localStorage :", role); // Pour debug
    return role;
  }

  logout(): void{
    localStorage.removeItem('token');
  }
}


