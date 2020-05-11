import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user: User = {
    name: "",
    clicks: 0
  }

  deletedFlag: boolean = false;

  constructor() { }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  setDeletedFlag(deleted: boolean): void {
    this.deletedFlag = deleted;
  }

  getDeletedFlag(): boolean {
    return this.deletedFlag;
  }
}
