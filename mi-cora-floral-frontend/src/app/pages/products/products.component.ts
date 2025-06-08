// mi-cora-floral-frontend/src/app/pages/products/products.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { ProductCardComponent } from '@shared/product-card/product-card.component'; 
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';

import { Category } from '@core/models/category';
import { Product } from '@core/models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, RouterModule, ProductCardComponent], 
})
export class ProductsComponent implements OnInit {
  categories: Category[] = [];
  currentCategory: Category | null = null;
  categoryProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.openCategoryBySlug(slug);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data.sort((a, b) => a.catalogOrder - b.catalogOrder);
    });
  }

  openCategoryBySlug(slug: string): void {
    this.categoryService.getCategoryBySlug(slug).subscribe(category => {
      if (category) {
        this.currentCategory = category;

        // ✅ Set categoryId before calling getAll()
        this.productService.setCategoryId(category.id);
        this.productService.getAll().subscribe(products => {
          this.categoryProducts = products.sort((a, b) => a.catalogOrder - b.catalogOrder);
        });
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  goBackToCategories(): void {
    this.currentCategory = null;
    this.router.navigate(['/products']);
  }
}