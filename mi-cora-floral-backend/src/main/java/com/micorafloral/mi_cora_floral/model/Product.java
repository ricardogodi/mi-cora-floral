// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/model/Product.java

package com.micorafloral.mi_cora_floral.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private String imageUrl;
    private boolean featured;

    private int catalogOrder; // Order for catalog
    private int featuredOrder; // Order for featured category

    @ManyToOne
    @JoinColumn(name = "catalog_category_id")
    @JsonBackReference
    private CatalogCategory catalogCategory;

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", catalogCategoryId=" + (catalogCategory != null ? catalogCategory.getId() : "null") +
                '}';
    }
}