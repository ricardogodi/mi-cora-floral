// mi-cora-floral-frontend/src/app/core/contact.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ContactMessage } from '@core/models/contact-message';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private apiUrl = `${environment.apiBaseUrl}/contact`; // Spring Boot endpoint

    constructor(private http: HttpClient) { }

    sendMessage(message: ContactMessage): Observable<ContactMessage> {
        return this.http.post<ContactMessage>(`${this.apiUrl}`, message);
    }
}