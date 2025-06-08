// mi-cora-floral-frontend/src/app/core/models/category.ts

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  catalogOrder: number;
}

export interface CategoryInput {
  name: string;
  description: string;
  file: File;
}