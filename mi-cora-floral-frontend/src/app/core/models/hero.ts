// mi-cora-floral-frontend/src/app/core/models/hero.ts

export interface HeroContent {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  heroOrder: number;
}

export interface HeroInput {
  title: string;
  subtitle: string;
  file: File;
}