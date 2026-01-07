// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  auth = getAuth();

  constructor() {
    onAuthStateChanged(this.auth, user => {
      this.loggedIn.next(!!user);
    });
  }

  login(email: string, password: string) { return signInWithEmailAndPassword(this.auth, email, password); }
  register(email: string, password: string) { return createUserWithEmailAndPassword(this.auth, email, password); }
  logout() { return signOut(this.auth); }
}
