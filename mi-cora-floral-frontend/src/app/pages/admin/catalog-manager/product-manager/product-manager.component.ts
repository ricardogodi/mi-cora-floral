// mi-cora-floral-frontend/src/app/pages/admin/catalog-manager/product-manager/product-manager.component.ts

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ProductService } from '@core/services/product.service';
import { Product } from '@core/models/product';
import { Category } from '@core/models/category';
import { FormField } from '@shared/reusable-form/reusable-form.component';
import { ReusableManagerComponent } from '@shared/reusable-manager/reusable-manager.component';
import { SharedStateService } from '@core/services/shared-state.service';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [CommonModule, NgIf, ReusableManagerComponent],
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit, OnChanges {

  @Input() category: Category | null = null;
  @Output() selectProduct = new EventEmitter<Product>();
  @Output() back = new EventEmitter<void>();

  products: Product[] = [];

  formFields: FormField[] = [
    { label: 'Nombre', key: 'name', type: 'text' },
    { label: 'Descripción', key: 'description', type: 'textarea' },
    { label: 'Precio', key: 'price', type: 'text' },
    { label: 'Destacado', key: 'featured', type: 'checkbox' }
  ];

  constructor(
    public productService: ProductService,
    private sharedState: SharedStateService
  ) { }

  ngOnInit(): void {
    this.sharedState.productsUpdated$.subscribe(() => this.loadCategoryProducts());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && this.category) {
      this.productService.setCategoryId(this.category.id);
      this.loadCategoryProducts();
    }
  }

  loadCategoryProducts(): void {
    if (!this.category) {
      console.warn('[ProductManager] No category set'); // For debugging
      return;
    }

    console.log('[ProductManager] Loading products for category:', this.category.id); // For debugging

    this.productService.getAll().subscribe(products => {
      console.log('[ProductManager] Fetched products:', products); // For debugging
      this.products = products.sort((a, b) => a.catalogOrder - b.catalogOrder);
    }, error => {
      console.error('[ProductManager] Failed to fetch products:', error); // For debugging
    });
  }

  handleReload(): void {
    this.loadCategoryProducts();
    this.sharedState.notifyProductsUpdated(); // ensures sync across components
  }

  handleToggle({ item, event }: { item: Product; event: Event }): void {
    const checkbox = event.target as HTMLInputElement;
    item.featured = checkbox.checked;

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(item)], { type: 'application/json' }));

    this.productService.update(item.id, formData).subscribe(() => {
      this.sharedState.notifyProductsUpdated();
    });
  }
}