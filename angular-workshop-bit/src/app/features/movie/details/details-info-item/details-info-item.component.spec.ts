import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInfoItemComponent } from './details-info-item.component';

describe('DetailsInfoItemComponent', () => {
  let component: DetailsInfoItemComponent;
  let fixture: ComponentFixture<DetailsInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsInfoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
