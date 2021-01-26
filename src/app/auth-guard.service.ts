import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  // tslint:disable-next-line: typedef
  canActivate(route: any , state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map (
      user => {
     if ( user ) { return true; }

     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } } );
     return false;
    }));
  }



  // canActivate(route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   this.auth.user$.pipe(
  //     map(user => {
  //       if (user) { return true; }

  //       this.router.navigate(['/login']);
  //       return false;
  //     })
  //   );
  // }
}
