// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/controller/ProductController.java

package com.micorafloral.mi_cora_floral.controller;

import com.micorafloral.mi_cora_floral.model.Product;
import com.micorafloral.mi_cora_floral.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/featured")
    public List<Product> getFeaturedProducts() {
        return productService.getFeaturedProducts();
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(
            @RequestPart("product") Product product,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            Product saved = productService.addProduct(product, file);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") Product updatedProduct,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            Product updated = productService.updateProduct(id, updatedProduct, file);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/reorder/catalog")
    public ResponseEntity<Map<String, String>> reorderCatalog(@RequestBody List<Product> reorderedProducts) {
        productService.reorderCatalog(reorderedProducts);
        return ResponseEntity.ok(Map.of("message", "Catalog order updated"));
    }

    @PutMapping("/reorder/featured")
    public ResponseEntity<Map<String, String>> reorderFeatured(@RequestBody List<Product> reorderedProducts) {
        productService.reorderFeatured(reorderedProducts);
        return ResponseEntity.ok(Map.of("message", "Featured order updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteProduct(@PathVariable Long id) {
        Map<String, String> response = productService.deleteProduct(id);
        if (response.containsKey("error")) {
            return ResponseEntity.status(404).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }
}