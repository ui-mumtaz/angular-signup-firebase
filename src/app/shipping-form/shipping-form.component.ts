import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: no-input-rename
  @Input('cart') cart!: ShoppingCart;

  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };

  userSubscription: Subscription =  new Subscription();
  userId = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService){}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user?.uid || '');
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder(): Promise<void>  {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['order-success', result.key]);
  }
}
