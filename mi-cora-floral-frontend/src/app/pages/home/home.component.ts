// mi-cora-floral-frontend/src/app/pages/home/home.component.ts

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductService } from '@core/services/product.service';
import { HeroService } from '@core/services/hero.service';
import { HeroContent } from '@core/models/hero';
import { ProductCardComponent } from '@shared/product-card/product-card.component';
import { environment } from '@environments/environment';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  heroes: HeroContent[] = [];
  currentHeroIndex = 0;
  featuredProducts: any[] = [];
  heroInterval: any;

  @ViewChild('heroText') heroText!: ElementRef;

  constructor(
    private productService: ProductService,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.loadHeroContent();
    this.loadFeaturedProducts();
  }

  loadHeroContent() {
    this.heroService.getAll().subscribe((data) => {
      this.heroes = data.sort((a, b) => a.heroOrder - b.heroOrder);
      if (this.heroes.length > 0) {
        this.startHeroRotation();
      }
    });
  }

  previousHero(): void {
    this.currentHeroIndex =
      (this.currentHeroIndex - 1 + this.heroes.length) % this.heroes.length;
    this.applyTextAnimation();
    this.restartHeroRotation();
  }

  nextHero(): void {
    this.currentHeroIndex =
      (this.currentHeroIndex + 1) % this.heroes.length;
    this.applyTextAnimation();
    this.restartHeroRotation();
  }

  restartHeroRotation(): void {
    clearInterval(this.heroInterval);
    this.startHeroRotation();
  }

  loadFeaturedProducts() {
    this.productService.getFeaturedProducts().subscribe((data) => {
      this.featuredProducts = data;
    });
  }

  startHeroRotation() {
    if (this.heroInterval) {
      clearInterval(this.heroInterval);
    }

    this.applyTextAnimation();
    this.heroInterval = setInterval(() => {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
      this.applyTextAnimation();
    }, 5000);
  }

  goToHero(index: number): void {
  this.currentHeroIndex = index;
  this.applyTextAnimation();
  this.restartHeroRotation();
}

  applyTextAnimation() {
    if (!this.heroText) return;
    const element = this.heroText.nativeElement;
    element.classList.remove('fade-in');
    void element.offsetWidth; // Force reflow
    element.classList.add('fade-in');
  }

  ngOnDestroy() {
    if (this.heroInterval) {
      clearInterval(this.heroInterval);
    }
  }
}