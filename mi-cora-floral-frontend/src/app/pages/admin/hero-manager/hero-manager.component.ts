// mi-cora-floral-frontend/src/app/pages/admin/hero-manager/hero-manager.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from '@core/services/hero.service';
import { HeroContent } from '@core/models/hero';
import { FormField } from '@shared/reusable-form/reusable-form.component';
import { ReusableManagerComponent } from '@shared/reusable-manager/reusable-manager.component';

@Component({
  selector: 'app-hero-manager',
  standalone: true,
  templateUrl: './hero-manager.component.html',
  styleUrls: ['./hero-manager.component.css'],
  imports: [CommonModule, ReusableManagerComponent]
})
export class HeroManagerComponent implements OnInit {
  heroes: HeroContent[] = [];

  formFields: FormField[] = [
    { label: 'Título', key: 'title', type: 'text' },
    { label: 'Subtítulo', key: 'subtitle', type: 'text' }
  ];

  constructor(public heroService: HeroService) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroService.getAll().subscribe(data => {
      this.heroes = [...data].sort((a, b) => a.heroOrder - b.heroOrder);
    });
  }
}