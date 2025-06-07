// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/controller/ContactController.java

// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/controller/ContactController.java

package com.micorafloral.mi_cora_floral.controller;

import com.micorafloral.mi_cora_floral.model.ContactMessage;
import com.micorafloral.mi_cora_floral.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submitMessage(@RequestBody ContactMessage message) {
        ContactMessage saved = contactService.processContactMessage(message);
        return ResponseEntity.ok(saved);
    }
}