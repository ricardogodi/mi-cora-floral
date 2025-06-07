// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/service/HeroContentService.java
package com.micorafloral.mi_cora_floral.service;

import com.micorafloral.mi_cora_floral.model.HeroContent;
import com.micorafloral.mi_cora_floral.repository.HeroContentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Service
public class HeroContentService {

    private final HeroContentRepository repository;

    public HeroContentService(HeroContentRepository repository) {
        this.repository = repository;
    }

    public List<HeroContent> getAllHeroContent() {
        return repository.findAllByOrderByHeroOrderAsc();
    }

    public HeroContent addHero(HeroContent hero, MultipartFile file) throws Exception {
        if (file != null && !file.isEmpty()) {
            String imageUrl = saveFile(file);
            hero.setImageUrl(imageUrl);
        }
        return repository.save(hero);
    }

    public HeroContent updateHero(Long id, HeroContent updatedHero, MultipartFile file) throws Exception {
        HeroContent existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Hero not found"));

        existing.setTitle(updatedHero.getTitle());
        existing.setSubtitle(updatedHero.getSubtitle());
        existing.setHeroOrder(updatedHero.getHeroOrder());

        if (file != null && !file.isEmpty()) {
            deleteFile(existing.getImageUrl());
            String imageUrl = saveFile(file);
            existing.setImageUrl(imageUrl);
        }

        return repository.save(existing);
    }

    public void deleteHeroWithImage(Long id) {
        HeroContent hero = repository.findById(id).orElse(null);
        if (hero != null) {
            deleteFile(hero.getImageUrl());
            repository.deleteById(id);
        }
    }

    public void reorderHeroes(List<HeroContent> heroes) {
        for (HeroContent hero : heroes) {
            HeroContent existing = repository.findById(hero.getId()).orElseThrow();
            existing.setHeroOrder(hero.getHeroOrder());
            repository.save(existing);
        }
    }

    private String saveFile(MultipartFile file) throws Exception {
        String uploadDir = System.getProperty("user.dir") + "/uploads/heroes/";
        new File(uploadDir).mkdirs();
        String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String filePath = uploadDir + uniqueName;
        file.transferTo(new File(filePath));
        return "heroes/" + uniqueName;
    }

    private void deleteFile(String imageUrl) {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            String filePath = System.getProperty("user.dir") + "/uploads/" + imageUrl;
            File file = new File(filePath);
            if (file.exists()) file.delete();
        }
    }
}