// mi-cora-floral-frontend/src/app/core/models/product.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  featured: boolean;
  categoryId: number;
  catalogOrder: number;
  featuredOrder: number;
}

export interface ProductInput {

  name: string;
  description: string;
  price: number;
  featured: boolean;
  file: File;
}