import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(
  //     switchMap((user: any) => this.userService.get(user.uid).valueChanges()),
  //     map ((appUser: any) => appUser.isAdmin)
  //   );
  // }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map ((appUser: any) => appUser.isAdmin)
    );
  }
}
