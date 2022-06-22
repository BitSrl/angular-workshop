import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieWatchProvidersItemComponent } from './movie-watch-providers-item.component';

describe('MovieWatchProvidersItemComponent', () => {
  let component: MovieWatchProvidersItemComponent;
  let fixture: ComponentFixture<MovieWatchProvidersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieWatchProvidersItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieWatchProvidersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
