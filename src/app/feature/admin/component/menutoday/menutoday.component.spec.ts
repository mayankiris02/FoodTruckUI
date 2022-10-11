import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTodayComponent } from './menutoday.component';

describe('MenuTodayComponent', () => {
  let component: MenuTodayComponent;
  let fixture: ComponentFixture<MenuTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
