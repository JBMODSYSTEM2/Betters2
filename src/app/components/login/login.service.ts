import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, UserCredential, GoogleAuthProvider } from 'firebase/auth';
import { Login } from './login.model';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  router = inject(Router);
  currentUserId: string;

  displayName$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() {
    this.getAuth().onAuthStateChanged(user => {
      this.displayName$.next(user ? user.displayName : null);
    });
  }

  getDisplayName(): Observable<string> {
    return this.displayName$.asObservable();
  }

  getAuth() {
    return getAuth();
  }

  signIn(user: Login) {
    return signInWithEmailAndPassword(this.getAuth(), user.email, user.password )  .then((userCredential: UserCredential) => {
      // Haz algo con userCredential aquí...
      this.currentUserId = userCredential.user.uid;
      // console.log(this.currentUserId);
    })
    .catch((error) => {
      // Maneja el error aquí...
    });
  }

  signinConGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider())
    .catch(error => {
      console.error('Error durante el inicio de sesión con Google: ', error);
      throw error;
    });
  }

  logOut(){
    this.auth.signOut();
  }



}
