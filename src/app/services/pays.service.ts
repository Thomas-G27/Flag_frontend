import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pays {
  id: number;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  private apiUrl = 'http://localhost:8080/api/countries';

  constructor(private http: HttpClient) {}

  getAllPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>(`${this.apiUrl}/`);
  }

  getPaysById(id: number): Observable<Pays> {
    return this.http.get<Pays>(`${this.apiUrl}/${id}`);
  }
  getPaysByCode(code: String): Observable<Pays> {
    return this.http.get<Pays>(`${this.apiUrl}/code/${code}`);
  }
}
