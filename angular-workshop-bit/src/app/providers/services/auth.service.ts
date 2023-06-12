import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "src/app/models/interfaces/user.interface";
import * as uuid from 'uuid';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: BehaviorSubject<User | null>;
  constructor() {
    // RE-HYDRATE THE STATE
    const user = this.getItem<User | null>('user');
    this.user$ = new BehaviorSubject<User | null>(user);
  }

  register(username: string, password: string, email: string, role: string = 'administrator'): void {
    const user: User = { username, password, email, role, id: uuid.v4() };
    const users: Array<User> = this.getItem<Array<User>>('users') ?? new Array<User>(); // coalesce operator
    const alreadyExists: boolean = users.some(u => u.username === username);
    if (!alreadyExists) {
      users.push(user);
    }

    this.setItem<Array<User>>('users', users);
  };

  login (username: string, password: string): boolean {
    const users: Array<User> = this.getItem<Array<User>>('users') ?? new Array<User>(); // coalesce operator
    const user: User | undefined = users.find(u => u.username === username && u.password === password);
    if (user) {
      this.user$.next(user);
      this.setItem<User>('user', user);
      return true;
    } else {
      return false;
    }
  };

  logout(): void {
    this.user$.next(null);
    this.setItem<null>('user', null);
  }

  private setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  };

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return !!item ? JSON.parse(item) : null; //bitwise operator => conversione a bit => 0 false 1 true
  };

  private removeItem(key: string): void {
    localStorage.removeItem(key);
  };
}