import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _username = new BehaviorSubject<string | null>(null);
  username$ = this._username.asObservable();

  constructor() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this._username.next(storedUsername);
    }
  }

  setUsername(username: string) {
    localStorage.setItem('username', username);
    this._username.next(username);
  }

  logout() {
    this._username.next(null);
    localStorage.clear();
    alert('Logged out Successfully');
  }
}
