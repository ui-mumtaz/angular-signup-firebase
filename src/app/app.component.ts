import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, private router: Router){
    auth.user$.subscribe(user => {
      if (!user) { return; }

      this.userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }

      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);

    });
  }
}