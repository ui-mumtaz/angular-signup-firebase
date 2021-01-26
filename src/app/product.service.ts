import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  // tslint:disable-next-line: typedef
  create(product: any){
    return this.db.list('/products/').push(product);
  }

  // tslint:disable-next-line: typedef
  getAll(){
    return this.db.list('/products/', query => query.orderByChild('title'))
    .snapshotChanges()
    .pipe(
      map((products: any) =>
        products.map((p: any) => ({key: p.payload.key, ...p.payload.val() }))
      )
    );
  }

  // tslint:disable-next-line: typedef
  get(productId: string ){
    return this.db.object('/products/' + productId);
  }

  // tslint:disable-next-line: typedef
  update(productId: string, product: any){
    return this.db.object('/products/' + productId).update(product);
  }

  // tslint:disable-next-line: typedef
  delete(productId: string){
    return this.db.object('/products/' + productId).remove();
  }
}
