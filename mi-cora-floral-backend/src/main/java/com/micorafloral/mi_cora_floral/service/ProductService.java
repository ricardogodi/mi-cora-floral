// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/service/ProductService.java

package com.micorafloral.mi_cora_floral.service;

import com.micorafloral.mi_cora_floral.model.CatalogCategory;
import com.micorafloral.mi_cora_floral.model.Product;
import com.micorafloral.mi_cora_floral.repository.CatalogCategoryRepository;
import com.micorafloral.mi_cora_floral.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CatalogCategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CatalogCategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAllByOrderByCatalogOrderAsc();
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueOrderByFeaturedOrderAsc();
    }

    public Product addProduct(Product product, MultipartFile file) throws Exception {
        if (file != null && !file.isEmpty()) {
            String fileName = saveFile(file);
            product.setImageUrl(fileName);
        }

        if (product.getCatalogCategory() != null && product.getCatalogCategory().getId() != null) {
            CatalogCategory category = categoryRepository.findById(product.getCatalogCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCatalogCategory(category);
        }

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct, MultipartFile file) throws Exception {
        Product existing = productRepository.findById(id).orElseThrow();

        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setPrice(updatedProduct.getPrice());
        existing.setFeatured(updatedProduct.isFeatured());
        existing.setCatalogOrder(updatedProduct.getCatalogOrder());
        existing.setFeaturedOrder(updatedProduct.getFeaturedOrder());

        if (updatedProduct.getCatalogCategory() != null && updatedProduct.getCatalogCategory().getId() != null) {
            CatalogCategory category = categoryRepository.findById(updatedProduct.getCatalogCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            existing.setCatalogCategory(category);
        }

        if (file != null && !file.isEmpty()) {
            deleteFile(existing.getImageUrl());
            String fileName = saveFile(file);
            existing.setImageUrl(fileName);
        }

        return productRepository.save(existing);
    }

    public void reorderCatalog(List<Product> reorderedProducts) {
        for (Product p : reorderedProducts) {
            Product existing = productRepository.findById(p.getId()).orElseThrow();
            existing.setCatalogOrder(p.getCatalogOrder());
            productRepository.save(existing);
        }
    }

    public void reorderFeatured(List<Product> reorderedProducts) {
        for (Product p : reorderedProducts) {
            Product existing = productRepository.findById(p.getId()).orElseThrow();
            existing.setFeaturedOrder(p.getFeaturedOrder());
            productRepository.save(existing);
        }
    }

    public Map<String, String> deleteProduct(Long id) {
        Map<String, String> response = new HashMap<>();
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            deleteFile(product.getImageUrl());
            productRepository.deleteById(id);
            response.put("message", "Product and associated image deleted.");
        } else {
            response.put("error", "Product not found.");
        }
        return response;
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCatalogCategoryId(categoryId);
    }

    private String saveFile(MultipartFile file) throws Exception {
        String uploadDir = System.getProperty("user.dir") + "/uploads/products/";
        new File(uploadDir).mkdirs();
        String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String filePath = uploadDir + uniqueName;
        file.transferTo(new File(filePath));
        return "products/" + uniqueName;
    }

    private void deleteFile(String imageUrl) {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            String filePath = System.getProperty("user.dir") + "/uploads/" + imageUrl;
            File file = new File(filePath);
            if (file.exists()) file.delete();
        }
    }
}