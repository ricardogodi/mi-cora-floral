// mi-cora-floral-frontend/src/app/core/interfaces/crud-service.interface.ts

import { Observable } from 'rxjs';

export interface CrudService<T, TInput> {
  getAll(): Observable<T[]>;
  add(data: FormData): Observable<T>;
  update(id: number, data: FormData): Observable<T>;
  delete(id: number): Observable<void>;
  reorder(items: T[]): Observable<void>;
}