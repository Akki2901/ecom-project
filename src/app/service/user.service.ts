import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _username = new BehaviorSubject<string | null>(null);
  username$ = this._username.asObservable();

  setUsername(username: string) {
    this._username.next(username);
  }

  logout() {
    this._username.next(null);
  }
}
