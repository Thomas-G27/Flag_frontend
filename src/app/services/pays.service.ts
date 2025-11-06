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
  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  getAllPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>(`${this.apiUrl}countries/`);
  }

  getPaysById(id: number): Observable<Pays> {
    return this.http.get<Pays>(`${this.apiUrl}countries/${id}`);
  }

  getPaysByCode(code: String): Observable<Pays> {
    return this.http.get<Pays>(`${this.apiUrl}countries/code/${code}`);
  }

  getPaysByContinent(continent: String): Observable<Pays[]> {
    return this.http.get<Pays[]>(`${this.apiUrl}continents/${continent}/countries`);
  }

  getPaysByLanguage(language: String): Observable<Pays[]> {
    return this.http.get<Pays[]>(`${this.apiUrl}languages/${language}/countries`);
  }
}
