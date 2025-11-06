import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Language {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class LanguagesService {
  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  getAllLanguages() {
    return this.http.get<Language[]>(`${this.apiUrl}languages/`);
  }
}
