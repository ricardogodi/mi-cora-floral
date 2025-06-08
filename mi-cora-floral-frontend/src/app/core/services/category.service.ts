// mi-cora-floral-frontend/src/app/core/category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '@core/models/category';
import { Product } from '@core/models/product';
import { CrudService } from '@core/interfaces/crud-service.interface';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService implements CrudService<Category, any> {

  private apiUrl = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  add(formData: FormData): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, formData);
  }

  update(id: number, formData: FormData): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  reorder(items: Category[]): Observable<void> {
    const payload = items.map(c => ({ id: c.id, catalogOrder: c.catalogOrder }));
    return this.http.put<void>(`${this.apiUrl}/reorder`, payload);
  }

  // Additional method (not part of CrudService interface)
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${categoryId}`); // CHECK THIS.
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/slug/${slug}`);
  }
}