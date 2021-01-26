import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent{
  categories$;
  // tslint:disable-next-line: no-input-rename
  @Input('category') category: any;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }
}
