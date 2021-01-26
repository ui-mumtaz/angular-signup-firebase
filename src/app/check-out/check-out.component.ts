import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<ShoppingCart> = new Observable<ShoppingCart>();

  constructor(private shoppingCartService: ShoppingCartService){}

  async ngOnInit(): Promise<void> {
     this.cart$ = await this.shoppingCartService.getCart();
  }
}