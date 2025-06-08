// mi-cora-floral-frontend/src/app/shared/reusable-manager/reusable-manager.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

import { ReusableListComponent } from '../reusable-list/reusable-list.component';
import { ReusableFormComponent, FormField, FormInputModel } from '../reusable-form/reusable-form.component';
import { CrudService } from '@core/interfaces/crud-service.interface';

@Component({
  selector: 'app-reusable-manager',
  standalone: true,
  imports: [CommonModule, DragDropModule, ReusableListComponent, ReusableFormComponent],
  templateUrl: './reusable-manager.component.html',
  styleUrls: ['./reusable-manager.component.css']
})
export class ReusableManagerComponent<T extends Record<string, any>> {

  @Input() title = '';
  @Input() addButtonText = 'Añadir';
  @Input() sortInstruction = 'Ordena los elementos';
  @Input() orderKey: keyof any = 'id';
  @Input() imageKey = 'imageUrl';
  @Input() jsonPartName = 'data';
  
  @Input() service!: CrudService<any, FormInputModel>;
  @Input() formFields: FormField[] = [];
  @Input() items: any[] = [];

  @Output() itemSelected = new EventEmitter<any>();
  @Output() reload = new EventEmitter<void>();

  // Event Emitters for 
  @Input() showBackButton = false;
  @Output() back = new EventEmitter<void>();
  @Input() parentContext: any = null;
  @Output() toggleCheckboxEvent = new EventEmitter<any>();

  showForm = false;
  editingItem: any | null = null;

  handleAddClick(): void {
    this.editingItem = null;
    this.showForm = true;
  }

  handleSubmit(event: { data: FormInputModel; isEdit: boolean }): void {
  const formData = new FormData();

  const order = this.items.length;
  const payload = { ...event.data, [this.orderKey]: order };

  if (this.parentContext?.id) {
    payload['catalogCategory'] = this.parentContext;
  }

  const fullPayload = event.isEdit && this.editingItem
    ? { ...this.editingItem, ...payload }
    : payload;

  console.log('[ReusableManager] Submitting payload:', fullPayload); // For debugging

  const json = new Blob([JSON.stringify(fullPayload)], {
    type: 'application/json'
  });

  formData.append(this.jsonPartName, json);
  if (event.data.file) formData.append('file', event.data.file);

  const action = event.isEdit && this.editingItem
    ? this.service.update(this.editingItem.id, formData)
    : this.service.add(formData);

  action.subscribe(() => this.reload.emit());
  this.handleClose();
}

  handleEdit(item: any): void {
    this.editingItem = item;
    this.showForm = true;
  }

  handleClose(): void {
    this.showForm = false;
    this.editingItem = null;
  }

  handleDelete(id: number): void {
    this.service.delete(id).subscribe(() => this.reload.emit());
  }

  handleDrop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.items.forEach((item, index) => (item[this.orderKey] as number) = index);
    this.service.reorder(this.items).subscribe();
  }

  handleSelect(item: any): void {
    this.itemSelected.emit(item);
  }
}