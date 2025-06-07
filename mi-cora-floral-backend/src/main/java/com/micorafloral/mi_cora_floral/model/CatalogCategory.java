// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/model/CatalogCategory.java

package com.micorafloral.mi_cora_floral.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CatalogCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String coverImageUrl;
    private String slug;  // Slug field

    private int catalogOrder;

    @OneToMany(mappedBy = "catalogCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Product> products;
}