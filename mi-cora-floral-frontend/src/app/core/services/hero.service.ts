// mi-cora-floral-frontend/src/app/core/services/hero.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HeroContent } from '@core/models/hero';
import { environment } from '@environments/environment';
import { CrudService } from '@core/interfaces/crud-service.interface';

@Injectable({ providedIn: 'root' })
export class HeroService implements CrudService<HeroContent, any> {

  private apiUrl = `${environment.apiBaseUrl}/hero`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<HeroContent[]> {
    return this.http.get<HeroContent[]>(this.apiUrl);
  }

  add(formData: FormData): Observable<HeroContent> {
    return this.http.post<HeroContent>(this.apiUrl, formData);
  }

  update(id: number, formData: FormData): Observable<HeroContent> {
    return this.http.put<HeroContent>(`${this.apiUrl}/${id}`, formData);
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  reorder(items: HeroContent[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/reorder`, items);
  }
}