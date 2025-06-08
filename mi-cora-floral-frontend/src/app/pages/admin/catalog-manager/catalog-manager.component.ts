// mi-cora-floral-frontend/src/app/pages/admin/catalog-manager/catalog-manager.component.ts

import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Category } from '@core/models/category';
import { CategoryManagerComponent } from './category-manager/category-manager.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';

@Component({
  selector: 'app-catalog-manager',
  standalone: true,
  imports: [NgIf, CategoryManagerComponent, ProductManagerComponent],
  templateUrl: './catalog-manager.component.html',
  styleUrls: ['./catalog-manager.component.css']
})

export class CatalogManagerComponent implements OnInit {
  viewMode: 'categoryList' | 'productList' = 'categoryList';
  selectedCategory: Category | null = null;

  ngOnInit() {}

  openCategory(category: Category) { 
    this.selectedCategory = category;
    this.viewMode = 'productList';
    console.log("Inside openCategory...")
  }

  goBackToCategories() {
    this.selectedCategory = null;
    this.viewMode = 'categoryList';
  }
}