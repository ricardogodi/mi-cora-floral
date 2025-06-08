// mi-cora-floral-frontend/src/app/core/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '@core/models/product';
import { CrudService } from '@core/interfaces/crud-service.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements CrudService<Product, FormData> {

  private apiUrl = `${environment.apiBaseUrl}/products`;

  private categoryId: number | null = null;

  constructor(private http: HttpClient) { }


  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
  }
  /**
   * Required to scope getAll() to a category
   */
  setCategoryId(categoryId: number) {
    this.categoryId = categoryId;
  }

  /**
   * getAll now returns products in the current category
   */
  getAll(): Observable<Product[]> {
    if (this.categoryId === null) {
      console.error('[ProductService] categoryId not set!'); // For debugging
      throw new Error('categoryId is not set in ProductService');
    }

    console.log('[ProductService] Fetching products for categoryId:', this.categoryId); // For debugging
    return this.http.get<Product[]>(`${this.apiUrl}/category/${this.categoryId}`);
  }

  add(data: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: number, data: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  reorder(products: Product[]): Observable<void> {
    const payload = products.map(p => ({ id: p.id, catalogOrder: p.catalogOrder }));
    return this.http.put<void>(`${this.apiUrl}/reorder/catalog`, payload);
  }

  // Additional methods not required by CrudService, still useful elsewhere
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured`);
  }

  reorderFeatured(products: Product[]): Observable<void> {
    const payload = products.map(p => ({ id: p.id, featuredOrder: p.featuredOrder }));
    return this.http.put<void>(`${this.apiUrl}/reorder/featured`, payload);
  }
}