// mi-cora-floral-frontend/src/app/pages/contact/contact.component.ts

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ContactService } from '@core/services/contact.service';
import { ContactMessage } from '@core/models/contact-message';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  subject: string = '';
  message: string = '';

  constructor(private contactService: ContactService) {}

  onSubmit() {
    const contactMessage: ContactMessage = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      subject: this.subject, // Include subject here!
      message: this.message,
    };

    this.contactService.sendMessage(contactMessage).subscribe({
      next: (response) => {
        alert('Message sent successfully!');
        this.name = '';
        this.email = '';
        this.phone = '';   
        this.subject = '';
        this.message = '';
      },
      error: (err) => {
        alert('Something went wrong. Please try again.');
        console.error(err);
      },
    });
  }
}