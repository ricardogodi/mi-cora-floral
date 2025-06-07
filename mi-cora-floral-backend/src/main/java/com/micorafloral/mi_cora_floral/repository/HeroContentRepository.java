// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/repository/HeroContentRepository.java

package com.micorafloral.mi_cora_floral.repository;

import com.micorafloral.mi_cora_floral.model.HeroContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HeroContentRepository extends JpaRepository<HeroContent, Long> {
    List<HeroContent> findAllByOrderByHeroOrderAsc();
}