import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  // tslint:disable-next-line: typedef
  async getCart(): Promise<Observable<ShoppingCart>>{
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .valueChanges()
    .pipe(
      map( (x: any) => new ShoppingCart(x.items))
    );
  }

  // tslint:disable-next-line: typedef
  async addToCart(product: Product){
    this.updateItem(product, 1);
  }

  // tslint:disable-next-line: typedef
  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  // tslint:disable-next-line: typedef
  async clearCart(){
    const carId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + carId + '/items').remove();
  }

  // tslint:disable-next-line: typedef
  private create(){
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  // tslint:disable-next-line: typedef
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    const resultKey  = (result.key) ? result.key : '';
    localStorage.setItem('cartId', resultKey);
    return resultKey;
  }

  // tslint:disable-next-line: typedef
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  // tslint:disable-next-line: typedef
  private async updateItem(product: Product, change: number){
    const cartId = await this.getOrCreateCartId();
    const item$  = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe( (item: any) => {

      const quantity = (item) ? item.quantity + change : 1;
      if (quantity === 0){ item$.remove(); }
      else{
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity
        });
      }
    });
  }
}
