// mi-cora-floral-frontend/src/app/shared/category-card/category-card.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() coverImageUrl!: string;

  get fullImageUrl(): string {
    return `http://localhost:8080/uploads/${this.coverImageUrl}`;
  }
}