import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableFormComponent } from './reusable-form.component';

describe('ReusableFormComponent', () => {
  let component: ReusableFormComponent;
  let fixture: ComponentFixture<ReusableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
