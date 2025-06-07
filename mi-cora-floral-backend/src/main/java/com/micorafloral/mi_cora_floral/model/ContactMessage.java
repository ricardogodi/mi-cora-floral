// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/model/ContactMessage.java

package com.micorafloral.mi_cora_floral.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String subject;
    private String message;
}