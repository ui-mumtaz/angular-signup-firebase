import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};
  id: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = this.categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) { this.productService.get(this.id).valueChanges().pipe(take(1))
    .subscribe(p => this.product = p);
    }
  }

  // tslint:disable-next-line: typedef
  save(product: any){
    if (this.id) { this.productService.update(this.id, product); }
    else { this.productService.create(product); }

    this.router.navigate(['/admin/products']);
  }

  // tslint:disable-next-line: typedef
  delete(){
    if (!confirm('Are you sure you want to delete this product')) { return; }
    if (this.id){this.productService.delete(this.id); }
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }


}
