import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  score: number;
  date: string;
  categorie: string;
  utilisateur_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/games/';

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  addGame(gameData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}`, gameData);
  }

}
