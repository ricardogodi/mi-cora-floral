// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/repository/CatalogCategoryRepository.java

package com.micorafloral.mi_cora_floral.repository;

import com.micorafloral.mi_cora_floral.model.CatalogCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CatalogCategoryRepository extends JpaRepository<CatalogCategory, Long> {
    Optional<CatalogCategory> findBySlug(String slug);
}