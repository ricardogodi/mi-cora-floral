// mi-cora-floral-frontend/src/app/shared/reusable-list/reusable-list.component.ts

import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { environment } from '@environments/environment';


@Component({
  selector: 'app-reusable-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './reusable-list.component.html',
  styleUrls: ['./reusable-list.component.css'],
})
export class ReusableListComponent<T> {
  @Input() items: any[] = [];
  @Input() imageKey!: string;
  @Input() disableInteraction = false;

  @Output() editItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<number>();
  @Output() dropItemEvent = new EventEmitter<CdkDragDrop<any[]>>();
  @Output() selectItemEvent = new EventEmitter<any>();

  @Output() toggleCheckboxEvent = new EventEmitter<any>();  // Only used for products

  imageBaseUrl = environment.imageBaseUrl;


}