import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature02Component } from './feature02.component';

describe('Feature02Component', () => {
  let component: Feature02Component;
  let fixture: ComponentFixture<Feature02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feature02Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Feature02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
