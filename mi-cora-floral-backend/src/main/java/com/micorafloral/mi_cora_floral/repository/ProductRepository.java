// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/repository/ProductRepository.java
package com.micorafloral.mi_cora_floral.repository;

import com.micorafloral.mi_cora_floral.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFeaturedTrueOrderByFeaturedOrderAsc();
    List<Product> findAllByOrderByCatalogOrderAsc();
    List<Product> findByCatalogCategoryId(Long categoryId);
}