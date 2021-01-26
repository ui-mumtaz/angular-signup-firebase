import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser?: AppUser | null;
  cart$: Observable<ShoppingCart | null >  = new Observable<ShoppingCart>()  ;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {}

  // tslint:disable-next-line: typedef
  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = (await this.shoppingCartService.getCart());
  }

  // tslint:disable-next-line: typedef
  logout(){
    this.auth.logout();
  }
}
