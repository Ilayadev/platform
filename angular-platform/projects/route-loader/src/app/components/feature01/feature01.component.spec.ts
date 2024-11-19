import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature01Component } from './feature01.component';

describe('Feature01Component', () => {
  let component: Feature01Component;
  let fixture: ComponentFixture<Feature01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feature01Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Feature01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
