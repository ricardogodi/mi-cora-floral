// mi-cora-floral-frontend/src/app/pages/admin/catalog-manager/category-manager/category-manager.component.ts

import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CategoryService } from '@core/services/category.service';
import { Category } from '@core/models/category';
import { FormField } from '@shared/reusable-form/reusable-form.component';
import { ReusableManagerComponent } from '@shared/reusable-manager/reusable-manager.component';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css'],
  imports: [ReusableManagerComponent]
})
export class CategoryManagerComponent implements OnInit {
  
  @Output() selectCategory = new EventEmitter<Category>();

  categories: Category[] = [];

  formFields: FormField[] = [
    { label: 'Nombre', key: 'name', type: 'text' },
    { label: 'Descripción', key: 'description', type: 'textarea' }
  ];

  constructor(public categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = [...data].sort((a, b) => a.catalogOrder - b.catalogOrder);
    });
  }
}