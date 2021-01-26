import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{
  // tslint:disable-next-line: no-input-rename
  // tslint:disable-next-line: no-input-rename
  @Input('product') product: any;
  // tslint:disable-next-line: no-input-rename
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  // tslint:disable-next-line: typedef
  addToCart(){
    this.cartService.addToCart(this.product);
  }

  // tslint:disable-next-line: typedef
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }


}
