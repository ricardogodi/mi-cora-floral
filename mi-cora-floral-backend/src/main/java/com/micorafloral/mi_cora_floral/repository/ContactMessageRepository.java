// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/repository/ContactMessageRepository.java

package com.micorafloral.mi_cora_floral.repository;

import com.micorafloral.mi_cora_floral.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {}