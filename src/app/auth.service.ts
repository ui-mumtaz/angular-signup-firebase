import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.default.User | null>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  // tslint:disable-next-line: typedef
  login(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log(returnUrl);
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  // tslint:disable-next-line: typedef
  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser | null>{
    return this.user$
    .pipe(
      switchMap((user: any) => user ? this.userService.get(user.uid).valueChanges() : of(null))
    );
  }
}
