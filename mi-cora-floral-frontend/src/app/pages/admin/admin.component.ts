// mi-cora-floral-frontend/src/app/pages/admin/admin.component.ts

import { Component } from '@angular/core';

import { HeroManagerComponent } from './hero-manager/hero-manager.component';
import { FeaturedManagerComponent } from './featured-manager/featured-manager.component';
import { CatalogManagerComponent } from './catalog-manager/catalog-manager.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [HeroManagerComponent, FeaturedManagerComponent, CatalogManagerComponent],
})
export class AdminComponent {}