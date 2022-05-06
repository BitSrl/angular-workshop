import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDividerComponent } from './details-divider.component';

describe('DetailsDividerComponent', () => {
  let component: DetailsDividerComponent;
  let fixture: ComponentFixture<DetailsDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
