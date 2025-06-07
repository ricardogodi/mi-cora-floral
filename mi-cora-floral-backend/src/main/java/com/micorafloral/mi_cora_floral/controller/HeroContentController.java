// mi-cora-floral-backend/src/main/java/com/micorafloral/mi_cora_floral/controller/HeroContentController.java
package com.micorafloral.mi_cora_floral.controller;

import com.micorafloral.mi_cora_floral.model.HeroContent;
import com.micorafloral.mi_cora_floral.service.HeroContentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hero")
public class HeroContentController {

    private final HeroContentService service;

    public HeroContentController(HeroContentService service) {
        this.service = service;
    }

    @GetMapping
    public List<HeroContent> getHeroContent() {
        return service.getAllHeroContent();
    }

    @PostMapping
    public ResponseEntity<HeroContent> addHero(
            @RequestPart("hero") HeroContent hero,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            HeroContent saved = service.addHero(hero, file);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HeroContent> updateHero(
            @PathVariable Long id,
            @RequestPart("hero") HeroContent hero,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            HeroContent updated = service.updateHero(id, hero, file);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/reorder")
    public ResponseEntity<Map<String, String>> reorderHeroes(@RequestBody List<HeroContent> heroes) {
        service.reorderHeroes(heroes);
        return ResponseEntity.ok(Map.of("message", "Hero order updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteHero(@PathVariable Long id) {
        service.deleteHeroWithImage(id);
        return ResponseEntity.ok(Map.of("message", "Hero and associated image deleted."));
    }
}