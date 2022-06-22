import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieHeadingComponent } from './movie-heading.component';

describe('MovieHeadingComponent', () => {
  let component: MovieHeadingComponent;
  let fixture: ComponentFixture<MovieHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
