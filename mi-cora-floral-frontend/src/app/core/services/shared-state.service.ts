// mi-cora-floral-frontend/src/app/core/shared-state.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  private productsUpdated = new BehaviorSubject<void>(undefined);
  productsUpdated$ = this.productsUpdated.asObservable();

  notifyProductsUpdated() {
    this.productsUpdated.next();
  }
}