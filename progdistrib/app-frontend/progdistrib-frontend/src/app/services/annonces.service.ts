import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private apiUrl = 'http://localhost:3000';
  public annonces = signal<any[]>([]); 
  public description = signal<any>(null);

  constructor(private http: HttpClient) {}

  //Get All Annonces
  getAnnonces(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/annonces`).pipe(
      tap((annonces) => this.annonces.set(annonces))
    );
  }

  // Get Annonce By ID
  getOneAnnonce(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/annonce/${id}`).pipe(
      tap((annonce) => this.description.set(annonce)) 
    );
  }
}
