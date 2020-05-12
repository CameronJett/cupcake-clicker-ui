import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  URL: string = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }

  getLeaderboardList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.URL}/leaderboard`);
  }
}
