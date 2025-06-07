// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/service/CatalogCategoryService.java
package com.micorafloral.mi_cora_floral.service;

import com.micorafloral.mi_cora_floral.model.CatalogCategory;
import com.micorafloral.mi_cora_floral.model.Product;
import com.micorafloral.mi_cora_floral.repository.CatalogCategoryRepository;
import com.micorafloral.mi_cora_floral.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CatalogCategoryService {

    private final CatalogCategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CatalogCategoryService(CatalogCategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    public List<CatalogCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<CatalogCategory> getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug);
    }

    public CatalogCategory addCategory(CatalogCategory category, MultipartFile file) {
        String imageUrl = saveFile(file);
        category.setCoverImageUrl(imageUrl);
        category.setSlug(generateSlug(category.getName()));
        return categoryRepository.save(category);
    }

    public CatalogCategory updateCategory(Long id, CatalogCategory updated, MultipartFile file) {
        CatalogCategory existing = categoryRepository.findById(id).orElseThrow();
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setSlug(generateSlug(updated.getName()));

        if (file != null && !file.isEmpty()) {
            deleteFile(existing.getCoverImageUrl());
            existing.setCoverImageUrl(saveFile(file));
        }

        return categoryRepository.save(existing);
    }

    public void reorderCategories(List<CatalogCategory> categories) {
        for (CatalogCategory c : categories) {
            CatalogCategory existing = categoryRepository.findById(c.getId()).orElseThrow();
            existing.setCatalogOrder(c.getCatalogOrder());
            categoryRepository.save(existing);
        }
    }

    public void deleteCategory(Long id) {
        CatalogCategory category = categoryRepository.findById(id).orElseThrow();
        deleteFile(category.getCoverImageUrl());

        if (category.getProducts() != null) {
            for (Product product : category.getProducts()) {
                deleteFile(product.getImageUrl());
                productRepository.deleteById(product.getId());
            }
        }

        categoryRepository.deleteById(id);
    }

    private String saveFile(MultipartFile file) {
        try {
            String uploadDir = System.getProperty("user.dir") + "/uploads/categories/";
            new File(uploadDir).mkdirs();
            String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + uniqueName;
            file.transferTo(new File(filePath));
            return "categories/" + uniqueName;
        } catch (Exception e) {
            throw new RuntimeException("File upload error", e);
        }
    }

    private void deleteFile(String imageUrl) {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            String filePath = System.getProperty("user.dir") + "/uploads/" + imageUrl;
            File file = new File(filePath);
            if (file.exists()) file.delete();
        }
    }

    private String generateSlug(String name) {
        return Normalizer.normalize(name, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
    }
}