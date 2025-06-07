// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/model/HeroContent.java

package com.micorafloral.mi_cora_floral.model;

import jakarta.persistence.*;

@Entity
public class HeroContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subtitle;
    private String imageUrl;
    private Integer heroOrder;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Integer getHeroOrder() { return heroOrder; }
    public void setHeroOrder(Integer heroOrder) { this.heroOrder = heroOrder; }
}