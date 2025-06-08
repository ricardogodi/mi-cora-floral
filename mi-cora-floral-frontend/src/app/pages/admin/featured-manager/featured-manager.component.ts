// mi-cora-floral-frontend/src/app/pages/admin/featured-manager/featured-manager.component.ts

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';

import { environment } from '@environments/environment';
import { SharedStateService } from '@core/services/shared-state.service';
import { ProductService } from '@core/services/product.service';
import { Product, ProductInput } from '@core/models/product';

import { ReusableFormComponent, FormField, FormInputModel } from '@shared/reusable-form/reusable-form.component';
import { ReusableListComponent } from '@shared/reusable-list/reusable-list.component';

@Component({
  selector: 'app-featured-manager',
  standalone: true,
  templateUrl: './featured-manager.component.html',
  styleUrls: ['./featured-manager.component.css'],
  imports: [NgIf, DragDropModule, ReusableFormComponent, ReusableListComponent],
})
export class FeaturedManagerComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  featuredProducts: Product[] = [];
  editingProduct: Product | null = null;
  showForm = false;

  formFields: FormField[] = [
    { label: 'Nombre', key: 'name', type: 'text' },
    { label: 'Descripción', key: 'description', type: 'textarea' },
    { label: 'Precio', key: 'price', type: 'text' },
    { label: 'Destacado', key: 'featured', type: 'checkbox' }
  ];

  constructor(
    private productService: ProductService,
    private sharedState: SharedStateService
  ) {}

  ngOnInit() {
    this.loadFeaturedProducts();
    this.sharedState.productsUpdated$.subscribe(() => this.loadFeaturedProducts());
  }

  loadFeaturedProducts() {
    this.productService.getFeaturedProducts().subscribe(data => {
      this.featuredProducts = data.sort((a, b) => a.featuredOrder - b.featuredOrder);
    });
  }

  handleEdit(product: Product): void {
    this.editingProduct = product;
    this.showForm = true;
  }

  handleSubmit(event: { data: FormInputModel; isEdit: boolean }) {
    const formData = new FormData();

    if (event.isEdit && this.editingProduct) {
      const updated = {
        ...this.editingProduct,
        ...event.data
      };

      formData.append('product', new Blob([JSON.stringify(updated)], { type: 'application/json' }));
      if (event.data.file) formData.append('file', event.data.file);

      this.productService.update(this.editingProduct.id, formData).subscribe(() => {
        this.loadFeaturedProducts();
        this.sharedState.notifyProductsUpdated();
      });
    }

    this.handleClose();
  }

  handleClose(): void {
    this.editingProduct = null;
    this.showForm = false;
  }

  dropFeatured(event: CdkDragDrop<Product[]>) {
    moveItemInArray(this.featuredProducts, event.previousIndex, event.currentIndex);
    this.featuredProducts.forEach((p, i) => p.featuredOrder = i);
    this.productService.reorderFeatured(this.featuredProducts).subscribe();
  }

  handleFeaturedToggle({ item, event }: { item: Product; event: Event }): void {
    const checkbox = event.target as HTMLInputElement;
    item.featured = checkbox.checked;

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(item)], { type: 'application/json' }));

    this.productService.update(item.id, formData).subscribe(() => {
      this.sharedState.notifyProductsUpdated();
    });
  }

  handleDelete(id: number): void {
    this.productService.delete(id).subscribe(() => this.loadFeaturedProducts());
  }
}