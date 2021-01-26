import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | null = '';
  cart$: Observable<ShoppingCart> = new Observable<ShoppingCart>();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {}

  // tslint:disable-next-line: typedef
  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts(): void {
    this.productService
      .getAll()
      .pipe(
        switchMap((products: any) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      ).subscribe(params => {
          this.category = params.get('category');
          this.applyFilter();
        });
  }

  private applyFilter(): void {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
