import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTruckMenuComponent } from './foodtruckmenu.component';

describe('FoodTruckMenuComponent', () => {
  let component: FoodTruckMenuComponent;
  let fixture: ComponentFixture<FoodTruckMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodTruckMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodTruckMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
