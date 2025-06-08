// mi-cora-floral-frontend/src/app/shared/reusable-form/reusable-form.component.ts

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FormField {
  label: string;
  key: string;
  type: 'text' | 'textarea' | 'checkbox';
}

export interface FormInputModel {
  [key: string]: any;
  file: File;
}

@Component({
  selector: 'app-reusable-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.css'],
})

export class ReusableFormComponent<T> implements OnChanges {
  @Input() visible = false;
  @Input() formFields: FormField[] = [];
  @Input() item: T | null = null;

  @Output() submitItemEvent = new EventEmitter<{ data: FormInputModel; isEdit: boolean }>();
  @Output() closeEvent = new EventEmitter<void>();

  form: FormInputModel = this.emptyForm();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.item) {
      this.form = {
        ...this.emptyForm(),
        ...this.item,
        file: {} as File,
      };
    }

    console.log("Inside ngOnChanges");
  }

  private emptyForm(): FormInputModel {
    const form: any = {};
    this.formFields.forEach(field => form[field.key] = '');
    form.file = {} as File;
    console.log("inside empty Form");
    return form;
  }

  onImageSelected(event: any): void {
     console.log("inside onImageSelected ");
    this.form.file = event.target.files[0];
  }

  submit(): void {
    const isEdit = !!this.item;
    const hasValidFile = this.form.file instanceof File && this.form.file.size > 0;

    if (!hasValidFile && !isEdit) {
      alert('Por favor selecciona una imagen!');
      return;
    }
    console.log("inside submit ");
    this.submitItemEvent.emit({ data: { ...this.form }, isEdit });
    this.reset();
    
  }

  cancel(): void {
    console.log("INSIDE CANCEL")
    this.reset();
  }

  private reset(): void {
    this.form = this.emptyForm();
    this.closeEvent.emit();
  }
}