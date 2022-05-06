import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHandlerComponent } from './list-handler.component';

describe('ListHandlerComponent', () => {
  let component: ListHandlerComponent;
  let fixture: ComponentFixture<ListHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
