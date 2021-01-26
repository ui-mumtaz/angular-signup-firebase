import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  rows: Product[] = [];
  products: Product[] = [];
  subscription: Subscription;

  constructor(private produtService: ProductService) {
    this.subscription = this.produtService.getAll()
      .subscribe(products => this.rows = this.products = products);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  filter(query: string){
    const filteredProducts  = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
    this.rows = filteredProducts;
  }

  ngOnInit(): void {
  }

}
