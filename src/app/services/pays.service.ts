import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pays {
  id: number;
  name: string;
  drapeau: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  private apiUrl = 'http://localhost:8080/api/pays';

  constructor(private http: HttpClient) {}

  getAllPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>(`${this.apiUrl}/`);
  }

  getPaysById(id: number): Observable<Pays> {
    return this.http.get<Pays>(`${this.apiUrl}/${id}`);
  }
}
