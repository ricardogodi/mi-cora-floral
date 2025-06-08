import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableManagerComponent } from './reusable-manager.component';

describe('ReusableManagerComponent', () => {
  let component: ReusableManagerComponent;
  let fixture: ComponentFixture<ReusableManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
