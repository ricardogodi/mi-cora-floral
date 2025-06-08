// mi-cora-floral-frontend/src/app/shared/product-card/product-card.component.ts

import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() imageUrl!: string;

   imageBaseUrl = environment.imageBaseUrl;

  get fullImageUrl(): string {
    // Add /products/ prefix for product images
    return `http://localhost:8080/uploads/${this.imageUrl}`;
  }
}