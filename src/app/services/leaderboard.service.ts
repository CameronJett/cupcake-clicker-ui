import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  URL: string = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }
  MOCK_USER: User = {
    id: 1,
    name: "username",
    clicks: 1
  }

  getLeaderboardList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.URL}/leaderboard`);
  }
}
