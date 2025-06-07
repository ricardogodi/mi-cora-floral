// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/service/ContactService.java

package com.micorafloral.mi_cora_floral.service;

import com.micorafloral.mi_cora_floral.model.ContactMessage;
import com.micorafloral.mi_cora_floral.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository contactMessageRepository, EmailService emailService) {
        this.contactMessageRepository = contactMessageRepository;
        this.emailService = emailService;
    }

    public ContactMessage processContactMessage(ContactMessage message) {
        // Save the message to the database
        ContactMessage saved = contactMessageRepository.save(message);

        // Send notification email to admin
        String adminEmail = "gdr1685@gmail.com"; // Replace with your admin email
        String subject = "New Contact Message from " + message.getName();
        String body = buildEmailBody(message);

        emailService.sendEmail(adminEmail, subject, body);

        return saved;
    }

    private String buildEmailBody(ContactMessage message) {
        return "Name: " + message.getName() + "\n"
             + "Phone: " + message.getPhone() + "\n"
             + "Email: " + message.getEmail() + "\n"
             + "Message: " + message.getMessage();
    }
}