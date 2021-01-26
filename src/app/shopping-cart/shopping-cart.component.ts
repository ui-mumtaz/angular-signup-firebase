import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart> =  new Observable<ShoppingCart>();

  constructor(private shoppingCartService: ShoppingCartService) { }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  // tslint:disable-next-line: typedef
  clearCart(){
    this.shoppingCartService.clearCart();
  }

}
