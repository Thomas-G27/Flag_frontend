import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Continent {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ContinentsService {
  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  getAllContinents() {
    return this.http.get<Continent[]>(`${this.apiUrl}continents/`);
  }
}
