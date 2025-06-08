// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/controller/CatalogCategoryController.java

package com.micorafloral.mi_cora_floral.controller;

import com.micorafloral.mi_cora_floral.model.CatalogCategory;
import com.micorafloral.mi_cora_floral.service.CatalogCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
public class CatalogCategoryController {

    private final CatalogCategoryService service;

    public CatalogCategoryController(CatalogCategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<CatalogCategory> getAllCategories() {
        return service.getAllCategories();
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<CatalogCategory> getCategoryBySlug(@PathVariable String slug) {
        return service.getCategoryBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CatalogCategory> addCategory(
            @RequestPart("category") CatalogCategory category,
            @RequestPart("file") MultipartFile file) {
        CatalogCategory saved = service.addCategory(category, file);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CatalogCategory> updateCategory(
            @PathVariable Long id,
            @RequestPart("category") CatalogCategory category,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        CatalogCategory updated = service.updateCategory(id, category, file);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/reorder")
    public ResponseEntity<Map<String, String>> reorderCategories(@RequestBody List<CatalogCategory> categories) {
        service.reorderCategories(categories);
        return ResponseEntity.ok(Map.of("message", "Category order updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCategory(@PathVariable Long id) {
        service.deleteCategory(id);
        return ResponseEntity.ok(Map.of("message", "Category, products, and images deleted."));
    }
}