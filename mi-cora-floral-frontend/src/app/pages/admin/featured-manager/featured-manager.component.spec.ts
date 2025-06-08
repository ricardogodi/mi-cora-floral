import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedManagerComponent } from './featured-manager.component';

describe('FeaturedManagerComponent', () => {
  let component: FeaturedManagerComponent;
  let fixture: ComponentFixture<FeaturedManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
