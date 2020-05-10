import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL: string = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }

  getUserByName(name: string): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}/${name}`);
  }
}
